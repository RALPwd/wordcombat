/* eslint-disable react/no-array-index-key */
import React from 'react';
import Letter from './Letter';
import styles from './word.module.scss';

export default function WordEmpty() {
  return (
    <div className={styles.row}>
      {Array.from(Array(5)).map((_, i) => <Letter key={i} value="" status="empty" />)}
    </div>
  );
}
