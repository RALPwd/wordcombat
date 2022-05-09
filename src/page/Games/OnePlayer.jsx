/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import randomWords from 'random-words-es';
import { Letters, Update } from '../../Store/Actions';
import useWindow from '../../Hooks/useWindow';
import { saveEditProfile, getPlayerById } from '../../services/player';
import { getGame, editGame } from '../../services/games';
import Game from '../Game';
import PlayerProfile from '../../components/PlayerProfile';
import styles from './GameStyles.module.scss';
import keys from '../../components/Constans/keys';
import { HOME_ROUTE } from '../../components/Constans/Routes';

export default function OnePlayer() {
  const [wordOfTheDay, setWordOfTheDay] = React.useState('');
  const player = useSelector((state) => state.player);
  const letters = useSelector((state) => state.gameLetters);
  const [wordLength, setWordLength] = React.useState(letters);
  const [turn, setTurn] = React.useState(1);
  const [currentWord, setCurrentWord] = React.useState('');
  const [completedWords, setCompletedWords] = React.useState([]);
  const [gameStatus, setGameStatus] = React.useState('playing');
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const params = useParams();
  const gameId = params.id;
  const [game, setGame] = React.useState({ _id: gameId });
  const playerId = player._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.token) {
      navigate(HOME_ROUTE);
    }
  }, []);

  const getCurrentGame = async () => {
    const currentGame = await getGame(gameId);
    setCompletedWords(currentGame.attemptsPlayer1);
    setGame(currentGame);
    if (currentGame.attemptsPlayer1.length !== 0) {
      setTurn(turn + currentGame.attemptsPlayer1.length);
    }
    if (!player._id) {
      const getPlayer = await getPlayerById(currentGame.playerOneId);
      dispatch(Update(getPlayer._doc));
    }
    if (currentGame.wordToGuess) {
      setWordOfTheDay(currentGame.wordToGuess.toUpperCase());
      setWordLength(currentGame.wordToGuess.length);
      dispatch(Letters(parseInt(currentGame.wordToGuess.length, 10)));
    } else {
      let word;
      do {
        [word] = randomWords({ exactly: 1, maxLength: wordLength });
      } while ([...word].length < wordLength);
      word = word.toUpperCase();
      setWordOfTheDay(word);
      setGame({ ...game, wordToGuess: word });
    }
    if (currentGame.winnerId) {
      setGameStatus('won');
    }
  };

  React.useEffect(() => {
    getCurrentGame();
  }, []);

  React.useEffect(() => {
    editGame(game)
      .then(() => {
        // do something
      })
      .catch((err) => {
        throw new Error(err);
      });
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
      setGame({
        ...game,
        winnerId: playerId,
        attemptsPlayer1: [...completedWords, currentWord],
      });
      setGameStatus('won');
      setModalIsOpen(true);
      setMessage(`¡Ganaste! la palabra es ${wordOfTheDay}`);
      const playerWon = {
        ...player,
        gamePlayed: player.gamePlayed + 1,
        gameWon: player.gameWon + 1,
      };
      saveEditProfile(playerWon);
      return;
    }

    if (turn === 6) {
      setCompletedWords([...completedWords, currentWord]);
      setGame({ ...game, attemptsPlayer1: [...completedWords, currentWord] });
      setGameStatus('lost');
      setModalIsOpen(true);
      setMessage(`¡Perdiste! la palabra es ${wordOfTheDay}`);
      const playerWon = { ...player, gamePlayed: player.gamePlayed + 1 };
      saveEditProfile(playerWon);
      return;
    }

    // if (currentWord.length === 5 && !isValidWord(currentWord)) {
    //   alert('Palabra no valida');
    //   return;
    // }

    setCompletedWords([...completedWords, currentWord]);
    getGame(gameId)
      .then((res) => {
        setGame(res);
        setGame({ ...game, attemptsPlayer1: [...completedWords, currentWord] });
      });
    setTurn(turn + 1);
    setCurrentWord('');
  }

  function onKeyPressed(key) {
    if (gameStatus !== 'playing') return;

    if (key === 'BACKSPACE' && currentWord.length > 0) {
      onDelete();
    }

    if (key === 'ENTER' && currentWord.length === wordLength && turn <= 6) {
      onEnter();
      return;
    }

    if (currentWord.length >= wordLength) return;

    if (keys.includes(key)) {
      onInput(key);
    }
  }

  function handleKeyDown(event) {
    const key = event.key.toUpperCase();

    onKeyPressed(key);
  }

  const handlerCloseModal = () => {
    setModalIsOpen(false);
  };

  useWindow('keydown', handleKeyDown);

  return (
    <div className={styles.main}>
      <div className={styles.main__inner}>
        <PlayerProfile
          profileImg={player.picture}
          nickName={player.nick}
          name={player.name}
          partidasJugadas={player.gamePlayed}
          Partidasganadas={player.gameWon}
        />
        <Game
          wordOfTheDay={wordOfTheDay}
          gameStatus={gameStatus}
          onKeyPressed={onKeyPressed}
          currentWord={currentWord}
          completedWords={completedWords}
          handlerCloseModal={handlerCloseModal}
          modalIsOpen={modalIsOpen}
          message={message}
          turn={turn}
        />
      </div>
    </div>
  );
}
