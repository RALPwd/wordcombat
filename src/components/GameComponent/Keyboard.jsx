/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React from 'react';
// import Proptypes from 'prop-types';
import styles from './keyboard.module.scss';

export default function Keyboard({ keys, onKeyPressed }) {
  function handleInput(e) {
    onKeyPressed(e.target.textContent);
  }

  function handleEnter() {
    onKeyPressed('ENTER');
  }

  function handleDelete() {
    onKeyPressed('BACKSPACE');
  }

  return (
    <div className={styles.keyboardContainer}>
      {Array.from(Array(10)).map((_, i) => <button type="button" key={i} className={styles.key} onClick={handleInput}>{keys[i]}</button>)}
      {Array.from(Array(10)).map((_, i) => <button type="button" key={i + 10} className={styles.key} onClick={handleInput}>{keys[i + 10]}</button>)}
      <button type="button" className={styles.enterKey} onClick={handleEnter}>↵</button>
      {Array.from(Array(7)).map((_, i) => <button type="button" key={i + 20} className={styles.key} onClick={handleInput}>{keys[i + 20]}</button>)}
      <button type="button" className={styles.deleteKey} onClick={handleDelete}>DEL</button>
    </div>
  );
}
