/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import {
  Letters, Update, GameId, wordToGuess,
} from '../../Store/Actions';
import { ONE_PLAYER, TWO_PLAYERS } from '../../components/Constans/Routes';
import { createGame } from '../../services/games';
import { sessionPlayer } from '../../services/player';
import NavBar from '../../components/NavBar';
import PlayerProfile from '../../components/PlayerProfile';
import Button from '../../components/Button';
import ChatBox from '../../components/ChatBox';
import { getAllDonation } from '../../services/donation';
import './Lobby.scss';
import socket from '../../utils/socket';

function Lobby() {
  Modal.setAppElement('#root');
  const data = useSelector((state) => state.player);
  const [modalOnePlayerIsOpen, setModalOnePlayerIsOpen] = React.useState(false);
  const [modalTwoPlayersIsOpen, setModalTwoPlayersIsOpen] = React.useState(false);
  const [donations, setDonations] = React.useState([]);
  const [gameLetters, setGameLetters] = React.useState(5);
  const [isWriting, setIsWriting] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const session = async () => {
    const player = await sessionPlayer();
    const { _doc } = player;
    dispatch(Update(_doc));
  };

  const getDonation = async () => {
    const dono = await getAllDonation();
    setDonations(dono);
  };

  React.useEffect(() => {
    getDonation();
    session();
  }, []);

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

  const handlerOpenOneplayerModal = () => {
    setModalOnePlayerIsOpen(true);
  };

  const handlerOpenTwoPlayersModal = () => {
    setModalTwoPlayersIsOpen(true);
  };

  const handlerCloseModal = () => {
    setModalOnePlayerIsOpen(false);
    setModalTwoPlayersIsOpen(false);
    socket.emit('quitarEmprejamiento', socket.id);
  };

  const handleSetValue = (e) => {
    setGameLetters(e.target.value);
  };

  const handleCreateGame = async (e) => {
    e.preventDefault();
    const game = {
      playerOneId: data._id,
      playerTwoId: null,
      winnerId: null,
      wordToGuess: null,
      attemptsPlayer1: [],
      attemptsPlayer2: [],
    };

    const gameCreated = await createGame(game);
    if (gameCreated.status === 201) {
      dispatch(Letters(parseInt(gameLetters, 10)));
      navigate(ONE_PLAYER);
    }
  };

  const handleCreateTwoPlayersGame = () => {
    let amPlayer = 0;
    handlerOpenTwoPlayersModal();
    socket.on('cantidadPlayers', (amountPlayers) => {
      amPlayer = amountPlayers;
    });
    if (amPlayer <= 2) {
      socket.emit('agregarPlayers', data);
    }

    socket.on('createGame', async (game) => {
      dispatch(Letters(parseInt(gameLetters, 10)));
      dispatch(GameId(game.idGame));
      dispatch(wordToGuess(game.word));
      navigate(`${TWO_PLAYERS}/${game.idGame}`);
    });
  };

  const handleFocus = () => {
    setIsWriting(true);
  };

  const handleBlur = () => {
    setIsWriting(false);
  };

  return (

    <div className="lobby-container">
      <NavBar />
      <PlayerProfile
        profileImg={data.picture}
        nickName={data.nick}
        name={data.name}
        partidasJugadas={data.gamePlayed}
        Partidasganadas={data.gameWon}
      />
      <div className="container-information">
        <div className="lobby-container__game-option">
          <Button name="jugar solo" type="button" onClick={handlerOpenOneplayerModal} />
          <Button name="jugar contra un amigo" type="button" onClick={handlerOpenTwoPlayersModal} />
          <Button name="partida aleatoria" type="button" onClick={handleCreateTwoPlayersGame} />

        </div>

        <div className="donations">
          <h2 className="donations__title">Donaciones</h2>
          <ul className="donations__container">
            {donations.reverse().slice(0, 5).map((donation) => (
              <li key={donation._id} className="donations__donationcard">
                Gracias
                <strong>
                  {' '}
                  {donation.player.nick}
                </strong>

                {' '}
                por donar
                {' '}
                <strong>{donation.amount}</strong>
                <br />
                {' '}
                Mensaje:
                {' '}
                <strong>{donation.message}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ChatBox typeChat="general" onFocus={handleFocus} onBlur={handleBlur} isWriting={isWriting} player={data.nick} />

      <Modal isOpen={modalOnePlayerIsOpen} style={customStyles} onRequestClose={handlerCloseModal}>
        <form onSubmit={handleCreateGame}>
          <h2>Selecciona la cantidad de letras para tu palabra</h2>
          <div>
            <label htmlFor="4letters">
              <input type="radio" name="lettercount" id="4letters" value="4" onChange={handleSetValue} />
              4 letras
            </label>
            <label htmlFor="5letters">
              <input type="radio" name="lettercount" id="5letters" value="5" onChange={handleSetValue} />
              5 letras
            </label>
            <label htmlFor="6letters">
              <input type="radio" name="lettercount" id="6letters" value="6" onChange={handleSetValue} />
              6 letras
            </label>
          </div>

          <button type="submit">Empezar nuevo juego</button>
        </form>
      </Modal>

      <Modal isOpen={modalTwoPlayersIsOpen} style={customStyles} onRequestClose={handlerCloseModal}>
        <h1>
          Esperando jugador
        </h1>

      </Modal>
    </div>
  );
}

export default Lobby;
