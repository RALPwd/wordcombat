/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useWindow from '../../Hooks/useWindow';
import { saveEditProfile } from '../../services/player';
import { editGame, getGame } from '../../services/games';
import Game from '../Game';
import socket from '../../utils/socket';
import keys from '../../components/Constans/keys';
import styles from './GameStyles.module.scss';

export default function TwoPlayers() {
  const [wordOfTheDay, setWordOfTheDay] = useState('');
  const player = useSelector((state) => state.player);
  const [turn, setTurn] = useState(1);
  const [currentWord, setCurrentWord] = useState('');
  const [completedWords, setCompletedWords] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  const [isMyTurn, setIsMyTurn] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const letterAmount = useSelector((state) => state.gameLetters);
  const params = useParams();
  const gameId = params.id;
  const [game, setGame] = useState({ _id: gameId });
  const [playersOnline, setPlayersOnline] = useState(0);
  const [isPlayerOne, setIsPlayerOne] = useState(false);
  const word = useSelector((state) => state.wordToGuess);

  useEffect(() => {
    console.log(word);
    const generateWord = () => {
      setWordOfTheDay(word);
      setGame({ ...game, wordToGuess: word });
    };
    const getCurrentGame = async () => {
      const currentGame = await getGame(gameId);
      if (currentGame.playerOneId === player._id) {
        setIsPlayerOne(true);
        setCompletedWords(currentGame.attemptsPlayer1);
      } else {
        setIsMyTurn(false);
        setCompletedWords(currentGame.attemptsPlayer2);
      }
      setGame(currentGame);
      if (currentGame.attemptsPlayer1.length !== 0) {
        setTurn(currentGame.attemptsPlayer1.length + 1);
      }
      if (currentGame.wordToGuess) {
        setWordOfTheDay(currentGame.wordToGuess.toUpperCase());
        setTurn(currentGame.attemptsPlayer1.length);
      } else {
        generateWord();
      }
      if (currentGame.winnerId) {
        setGameStatus('won');
      }
    };
    getCurrentGame();
  }, []);

  useEffect(() => {
    async function saveGame() {
      await editGame(game);
    }
    saveGame();
    socket.on(`${params.id}`, (players) => {
      if (players) {
        setPlayersOnline(players);
      }
    });
    return () => { socket.off(); };
  }, [game]);

  function onInput(letter) {
    const newWord = currentWord + letter;
    setCurrentWord(newWord);
  }

  function onDelete() {
    const newWord = currentWord.slice(0, -1);
    setCurrentWord(newWord);
  }

  function onEnter() {
    if (currentWord === wordOfTheDay) {
      setCompletedWords([...completedWords, currentWord]);
      if (isPlayerOne) {
        setGame({
          ...game,
          winnerId: player._id,
          attemptsPlayer1: [...completedWords, currentWord],
        });
      } else {
        setGame({
          ...game,
          winnerId: player._id,
          attemptsPlayer2: [...completedWords, currentWord],
        });
      }
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
      setCompletedWords([...completedWords, currentWord]);
      if (isPlayerOne) {
        setGame({ ...game, attemptsPlayer1: [...completedWords, currentWord] });
      } else {
        setGame({ ...game, attemptsPlayer2: [...completedWords, currentWord] });
      }
      setGameStatus('lost');
      setModalIsOpen(true);
      setMessage('You lost!');
      const playerWon = { ...player, gamePlayed: player.gamePlayed + 1 };
      saveEditProfile(playerWon);
      return;
    }

    // if (currentWord.length === 5 && !isValidWord(currentWord)) {
    //   alert('Palabra no valida');
    //   return;
    // }

    setCompletedWords([...completedWords, currentWord]);
    setIsMyTurn(!isMyTurn);
    socket.emit('emitTurn', 'Terminó mi turno');
    getGame(gameId)
      .then((res) => {
        setGame(res);
        if (isPlayerOne) {
          setGame({ ...game, attemptsPlayer1: [...completedWords, currentWord] });
        } else {
          setGame({ ...game, attemptsPlayer2: [...completedWords, currentWord] });
        }
        // setGameStatus('waiting'); para el player one
        // aqui un socket.emit que me permita avisar que terminé mi turno
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
    <div>
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
      {playersOnline === 0 ? <h1>cargando datos</h1> : (
        <div className={styles.playersProfileContainer}>
          <section className={`${styles.players} ${isPlayerOne && styles.isPlayer}`}>
            <img src={playersOnline?.player1.picture} alt={playersOnline?.player1.name} />
            <h2>{playersOnline?.player1.nick}</h2>
          </section>

          <h1>vs</h1>

          <section className={`${styles.players} ${!isPlayerOne && styles.isPlayer}`}>
            <img src={playersOnline?.player2.picture} alt={playersOnline?.player2.name} />
            <h2>{playersOnline?.player2.nick}</h2>
          </section>
        </div>
      ) }

    </div>

  );
}
