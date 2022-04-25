/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React from 'react';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';
import Letter from './Letter';
import styles from './word.module.scss';

export default function WordCompleted({ word, solution }) {
  const letterAmount = useSelector((state) => state.gameLetters);

  function checkLetter(letter, pos) {
    if (solution.includes(letter)) {
      if (solution[pos] === letter) {
        return 'correct';
      }
      return 'present';
    }
    return 'absent';
  }

  return (
    <div className={styles.row}>
      {Array.from(Array(letterAmount)).map((_, i) => <Letter key={i} value={word[i]} status={checkLetter(word[i], i)} />)}
    </div>
  );
}

WordCompleted.propTypes = {
  word: Proptypes.string.isRequired,
  solution: Proptypes.string.isRequired,
};
