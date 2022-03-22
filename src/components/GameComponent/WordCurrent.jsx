/* eslint-disable react/no-array-index-key */
import React from 'react';
import Proptypes from 'prop-types';
import Letter from './Letter';
import styles from './word.module.scss';

export default function WordCurrent({ word }) {
  return (
    <div className={styles.row}>
      {
        word.split('').map((letter, i) => <Letter key={i} value={letter} status="edit" />)
      }
      {
        Array.from(Array(5 - word.length)).map((letter, i) => <Letter key={i} value={letter} status="edit" />)
      }
    </div>
  );
}

WordCurrent.propTypes = {
  word: Proptypes.string.isRequired,
};
