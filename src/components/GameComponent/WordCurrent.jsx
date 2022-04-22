/* eslint-disable react/no-array-index-key */
import React from 'react';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';
import Letter from './Letter';
import styles from './word.module.scss';

export default function WordCurrent({ word }) {
  const letterAmount = useSelector((state) => state.gameLetters);

  return (
    <div className={styles.row}>
      {
        word.split('').map((letter, i) => <Letter key={i} value={letter} status="edit" />)
      }
      {
        Array.from(Array(letterAmount - word.length)).map((letter, i) => <Letter key={i} value={letter} status="edit" />)
      }
    </div>
  );
}

WordCurrent.propTypes = {
  word: Proptypes.string.isRequired,
};
