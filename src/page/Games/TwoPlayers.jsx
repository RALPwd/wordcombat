/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import randomWords from 'random-words-es';
import useWindow from '../../Hooks/useWindow';
import { saveEditProfile } from '../../services/player';
import { editGame, getGame } from '../../services/games';
import Game from '../Game';
import socket from '../../utils/socket';
import keys from '../../components/Constans/keys';
import './twoplayers.scss';

export default function TwoPlayers() {
  const [wordOfTheDay, setWordOfTheDay] = useState('');
  const player = useSelector((state) => state.player);
  const [turn, setTurn] = useState(1);
  const [currentWord, setCurrentWord] = useState('');
  const [completedWords, setCompletedWords] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const letterAmount = useSelector((state) => state.gameLetters);
  const params = useParams();
  const gameId = params.id;
  const [game, setGame] = useState({ _id: gameId });
  const [playersOnline, setPlayersOnline] = useState(0);

  useEffect(() => {
    const generateWord = () => {
      let word;
      do {
        [word] = randomWords({ exactly: 1, maxLength: letterAmount });
      } while ([...word].length < letterAmount);
      setWordOfTheDay(word.toUpperCase());
      setGame({ ...game, wordToGuess: word });
    };
    const getCurrentGame = async () => {
      const currentGame = await getGame(gameId);
      setCompletedWords(currentGame.attemptsPlayer1);
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
      setPlayersOnline(players);
      console.log(players);
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
      setGame({ ...game, winnerId: player._id, attemptsPlayer1: [...completedWords, currentWord] });
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
      setGame({ ...game, attemptsPlayer1: [...completedWords, currentWord] });
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
    setGame({ ...game, attemptsPlayer1: [...completedWords, currentWord] });
    setTurn(turn + 1);
    setCurrentWord('');
  }

  function onKeyPressed(key) {
    if (gameStatus !== 'playing') return;

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
      { console.log(playersOnline.player1)}
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
        <div className="playersProfileContainer">
          <section className="players">
            <img src={playersOnline?.player1.picture} alt={playersOnline?.player1.name} />
            <h2>{playersOnline?.player1.nick}</h2>
          </section>

          <h1>vs</h1>

          <section className="players">
            <img src={playersOnline?.player2.picture} alt={playersOnline?.player2.name} />
            <h2>{playersOnline?.player2.nick}</h2>
          </section>
        </div>
      ) }

    </div>

  );
}
