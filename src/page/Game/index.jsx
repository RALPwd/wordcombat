/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import randomWords from 'random-words-es';
import Modal from 'react-modal/lib/components/Modal';
import WordEmpty from '../../components/GameComponent/WordEmpty';
import WordCompleted from '../../components/GameComponent/WordCompleted';
import WordCurrent from '../../components/GameComponent/WordCurrent';
import useWindow from '../../Hooks/useWindow';
import { editGame } from '../../services/games';
import { saveEditProfile } from '../../services/player';
import styles from './index.module.scss';
import Keyboard from '../../components/GameComponent/Keyboard';

const keys = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'Ñ',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
];

export default function Game() {
  const [wordOfTheDay, setWordOfTheDay] = useState('');
  const [turn, setTurn] = useState(1);
  const [currentWord, setCurrentWord] = useState('');
  const [completedWords, setCompletedWords] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  const letterAmount = useSelector((state) => state.gameLetters);
  const gameId = useSelector((state) => state.gameId);
  const player = useSelector((state) => state.player);
  const [game, setGame] = useState({ id: gameId });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const generateWord = () => {
      let word;
      do {
        [word] = randomWords({ exactly: 1, maxLength: letterAmount });
      } while ([...word].length < letterAmount);
      setWordOfTheDay(word.toUpperCase());
      setGame({ ...game, wordToGuess: word });
    };
    generateWord();
  }, []);

  useEffect(() => {
    async function saveGame() {
      await editGame(game);
    }
    saveGame();
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
      const playerWon = { ...player, gamePlayed: player.gamePlayed + 1, gameWon: player.gameWon + 1 };
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

  useWindow('keydown', handleKeyDown);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '50%',
      height: '50%',
    },
  };

  const handlerCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className={styles.mainContainer}>
        {completedWords.map((word, i) => <WordCompleted key={i} word={word} solution={wordOfTheDay} />)}

        {gameStatus === 'playing' ? (
          <WordCurrent word={currentWord} />
        ) : null}

        {Array.from(Array(6 - turn)).map((_, i) => <WordEmpty key={i} />)}
      </div>
      <Keyboard
        keys={keys}
        onKeyPressed={onKeyPressed}
      />

      <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={handlerCloseModal}>
        <h2>{message}</h2>
      </Modal>
    </>
  );
}
