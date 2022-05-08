/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React from 'react';
import Modal from 'react-modal/lib/components/Modal';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import WordEmpty from '../../components/GameComponent/WordEmpty';
import WordCompleted from '../../components/GameComponent/WordCompleted';
import WordCurrent from '../../components/GameComponent/WordCurrent';
import styles from './index.module.scss';
import Keyboard from '../../components/GameComponent/Keyboard';
import keys from '../../components/Constans/keys';
import { LOBBY_ROUTE } from '../../components/Constans/Routes';

export default function Game({
  wordOfTheDay, onKeyPressed, currentWord, completedWords, gameStatus, modalIsOpen, message, turn,
}) {
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
      backgroundColor: '#4B4168',
      color: '#fff',
    },
  };

  return (
    <>
      <div className={styles.mainContainer}>
        {completedWords.map((word, i) => <WordCompleted key={i} word={word} solution={wordOfTheDay} />)}
        {
          gameStatus === 'playing' ? (
            <WordCurrent word={currentWord} />
          ) : null
        }

        {
        Array.from(Array(6 - turn)).map((_, i) => <WordEmpty key={i} />)
}
      </div>
      <Keyboard
        keys={keys}
        onKeyPressed={onKeyPressed}
      />

      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div className={styles.modalContainer}>
          <h2>{message}</h2>
          <Link
            to={LOBBY_ROUTE}
            style={{
              padding: '10px 20px 10px 0', fontSize: '18px', color: 'white', fontFamily: '"Source Code Pro", monospace',
            }}
          >
            Volver al lobby
          </Link>
        </div>
      </Modal>
    </>
  );
}

Game.propTypes = {
  wordOfTheDay: PropTypes.string.isRequired,
  onKeyPressed: PropTypes.func.isRequired,
  currentWord: PropTypes.string.isRequired,
  completedWords: PropTypes.arrayOf(PropTypes.string).isRequired,
  gameStatus: PropTypes.string.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  turn: PropTypes.number.isRequired,
};
