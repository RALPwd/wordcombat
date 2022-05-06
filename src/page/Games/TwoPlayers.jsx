/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { LOBBY_ROUTE } from '../../components/Constans/Routes';
import useWindow from '../../Hooks/useWindow';
import { saveEditProfile } from '../../services/player';
import { getGame } from '../../services/games';
import Game from '../Game';
import WordCompleted from '../../components/GameComponent/WordCompleted';
import socket from '../../utils/socket';
import keys from '../../components/Constans/keys';
import styles from './GameStyles.module.scss';
import './GameStylesPlain.scss';

export default function TwoPlayers() {
  const [wordOfTheDay, setWordOfTheDay] = useState('');
  const player = useSelector((state) => state.player);
  const [turn, setTurn] = useState(1);
  const [currentWord, setCurrentWord] = useState('');
  const [completedWords, setCompletedWords] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  const [isMyTurn, setIsMyTurn] = useState(true);
  const [turnMessage, setTurnMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const letterAmount = useSelector((state) => state.gameLetters);
  const params = useParams();
  const gameId = params.id;
  const [game, setGame] = useState({ _id: gameId });
  const [playersOnline, setPlayersOnline] = useState(0);
  const [isPlayerOne, setIsPlayerOne] = useState(false);
  const [oponentWord, setOponentWord] = useState('');
  const playerId = player._id;

  const getCurrentGame = async () => {
    const currentGame = await getGame(gameId);
    if (currentGame.playerOneId === playerId) {
      setIsPlayerOne(true);
      setTurnMessage('Tu turno');
      // TODO: Recuperar juego -- setCompletedWords(currentGame.attemptsPlayer1);
    } else {
      setIsMyTurn(false);
      setTurnMessage('Turno de tu oponente');
      // TODO: Recuperar juego -- setCompletedWords(currentGame.attemptsPlayer2);
    }
    setGame(currentGame);
    if (currentGame.wordToGuess) {
      setWordOfTheDay(currentGame.wordToGuess.toUpperCase());
    }
    if (currentGame.winnerId) {
      setGameStatus('won');
    }
  };

  useEffect(() => {
    socket.on(`${params.id}`, (players) => {
      if (players) {
        setPlayersOnline(players);
      }
    });
    getCurrentGame();
    return () => { socket.off(); };
  }, []);

  useEffect(() => {
    socket.on('emitTurn', (data) => {
      if (data.gameId === gameId) {
        if (data.playerId !== playerId) {
          setIsMyTurn(true);
          setTurnMessage('Tu turno');
          setOponentWord(data.currentWord);
        } else {
          setTurnMessage('Turno de tu oponente');
        }
      }
      if (data.winner === true) {
        setGameStatus('lost');
        setModalIsOpen(true);
        setMessage('¡Tenemos un ganador! Fin del juego');
      }
    });
    return () => { socket.off(); };
  }, [isMyTurn]);

  function onInput(letter) {
    const newWord = currentWord + letter;
    setCurrentWord(newWord);
  }

  function onDelete() {
    const newWord = currentWord.slice(0, -1);
    setCurrentWord(newWord);
  }

  function onEnter() {
    let winner = false;
    if (currentWord === wordOfTheDay) {
      winner = true;
      socket.emit('emitTurn', {
        gameId, playerId, currentWord, winner,
      });
      setCompletedWords([...completedWords, currentWord]);
      // TODO: Guardar intento
      // if (isPlayerOne) {
      //   setGame({
      //     ...game,
      //     winnerId: playerId,
      //     attemptsPlayer1: [...completedWords, currentWord],
      //   });
      // } else {
      //   setGame({
      //     ...game,
      //     winnerId: playerId,
      //     attemptsPlayer2: [...completedWords, currentWord],
      //   });
      // }
      setGameStatus('won');
      setModalIsOpen(true);
      setMessage('You won!');
      const playerWon = {
        ...player,
        gamePlayed: player.gamePlayed + 1,
        gameWon: player.gameWon + 1,
      };
      saveEditProfile(playerWon);
      return;
    }

    if (turn === 6) {
      socket.emit('emitTurn', {
        gameId, playerId, currentWord, winner,
      });
      setCompletedWords([...completedWords, currentWord]);
      // TODO: Guardar intento
      // if (isPlayerOne) {
      //   setGame({ ...game, attemptsPlayer1: [...completedWords, currentWord] });
      // } else {
      //   setGame({ ...game, attemptsPlayer2: [...completedWords, currentWord] });
      // }
      setGameStatus('lost');
      setModalIsOpen(true);
      setMessage('¡Agotaste tus intentos! Fin del juego');
      const playerWon = { ...player, gamePlayed: player.gamePlayed + 1 };
      saveEditProfile(playerWon);
      return;
    }

    // if (currentWord.length === 5 && !isValidWord(currentWord)) {
    //   alert('Palabra no valida');
    //   return;
    // }

    setCompletedWords([...completedWords, currentWord]);
    socket.emit('emitTurn', {
      gameId, playerId, currentWord, winner,
    });
    setIsMyTurn(!isMyTurn);
    getGame(gameId)
      .then((res) => {
        setGame(res);
        if (isPlayerOne) {
          setGame({ ...game, attemptsPlayer1: [...completedWords, currentWord] });
        } else {
          setGame({ ...game, attemptsPlayer2: [...completedWords, currentWord] });
        }
      });
    setTurn(turn + 1);
    setCurrentWord('');
  }

  function onKeyPressed(key) {
    if (gameStatus !== 'playing' || isMyTurn !== true) return;

    if (key === 'BACKSPACE' && currentWord.length > 0) {
      onDelete();
    }

    if (key === 'ENTER' && currentWord.length === letterAmount && turn <= 6) {
      onEnter();
      return;
    }

    if (currentWord.length >= letterAmount) return;

    if (keys.includes(key)) {
      onInput(key);
    }
  }

  function handleKeyDown(event) {
    const key = event.key.toUpperCase();

    onKeyPressed(key);
  }

  const handlerCloseModal = () => {
    setModalIsOpen(false);
  };

  useWindow('keydown', handleKeyDown);

  return (
    <div className={styles.twoplayers}>
      <div>
        <Link
          to={LOBBY_ROUTE}
          style={{
            position: 'absolute', top: '0', right: 0, padding: '10px 20px 10px 0', fontSize: '18px', color: '#fff', fontFamily: '"Source Code Pro", monospace',
          }}
        >
          Volver al lobby
        </Link>
        <section className="inGameScreen">

          <Game
            wordOfTheDay={wordOfTheDay}
            gameStatus={gameStatus}
            onKeyPressed={onKeyPressed}
            currentWord={currentWord}
            completedWords={completedWords}
            handlerCloseModal={handlerCloseModal}
            modalIsOpen={modalIsOpen}
            message={message}
            turn={turn}
          />
        </section>
      </div>

      <section className="onlinegame__chat">
        <div className="onlinegame__chat-chat--rivaltry">
          <h2>ultimo intento contrincante</h2>
          <WordCompleted word={oponentWord} solution={wordOfTheDay} />
        </div>

        <div className={styles.turnMessage}>{turnMessage}</div>
        {playersOnline === 0 ? <h1>cargando datos</h1> : (
          <div className={styles.playersContainer}>
            <section className={`${styles.playersContainer__players} ${isPlayerOne && styles.isPlayer}`}>
              <img src={playersOnline?.player1.picture} alt={playersOnline?.player1.name} />
              <h2>{playersOnline?.player1.nick}</h2>
            </section>

            <h1>vs</h1>

            <section className={`${styles.playersContainer__players} ${!isPlayerOne && styles.isPlayer}`}>
              <img src={playersOnline?.player2.picture} alt={playersOnline?.player2.name} />
              <h2>{playersOnline?.player2.nick}</h2>
            </section>
          </div>

        ) }
      </section>

    </div>

  );
}
