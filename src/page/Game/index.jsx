/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import randomWords from 'random-words-es';
import WordEmpty from '../../components/GameComponent/WordEmpty';
import WordCompleted from '../../components/GameComponent/WordCompleted';
import WordCurrent from '../../components/GameComponent/WordCurrent';
import useWindow from '../../Hooks/useWindow';
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

  useEffect(() => {
    const generateWord = () => {
      let word;
      do {
        [word] = randomWords({ exactly: 1, maxLength: 5 });
      } while ([...word].length < 5);
      setWordOfTheDay(word);
    };

    generateWord();
  }, []);

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
      setGameStatus('won');
      return;
    }

    if (turn === 6) {
      setCompletedWords([...completedWords, currentWord]);
      setGameStatus('lost');
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

    if (key === 'ENTER' && currentWord.length === 5 && turn <= 6) {
      onEnter();
      return;
    }

    if (currentWord.length >= 5) return;

    if (keys.includes(key)) {
      onInput(key);
    }
  }

  function handleKeyDown(event) {
    const key = event.key.toUpperCase();

    onKeyPressed(key);
  }

  useWindow('keydown', handleKeyDown);

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
    </>
  );
}
