/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useSelector } from 'react-redux';
import Letter from './Letter';
import styles from './word.module.scss';

export default function WordEmpty() {
  const letterAmount = useSelector((state) => state.gameLetters);

  return (
    <div className={styles.row}>
      {Array.from(Array(letterAmount)).map((_, i) => <Letter key={i} value="" status="empty" />)}
    </div>
  );
}
