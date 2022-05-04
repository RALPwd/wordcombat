/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React from 'react';
import Modal from 'react-modal/lib/components/Modal';
import PropTypes from 'prop-types';
import WordEmpty from '../../components/GameComponent/WordEmpty';
import WordCompleted from '../../components/GameComponent/WordCompleted';
import WordCurrent from '../../components/GameComponent/WordCurrent';
import styles from './index.module.scss';
import Keyboard from '../../components/GameComponent/Keyboard';
import keys from '../../components/Constans/keys';

export default function Game({
  wordOfTheDay, onKeyPressed, currentWord, completedWords, gameStatus, modalIsOpen, handlerCloseModal, message, turn,
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
    },
  };

  return (
    <>
      <div className={styles.mainContainer}>
        {completedWords.map((word, i) => <WordCompleted key={i} word={word} solution={wordOfTheDay} />)}
        { console.log(turn)}
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

      <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={handlerCloseModal}>
        <h2>{message}</h2>
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
  handlerCloseModal: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  turn: PropTypes.number.isRequired,
};
