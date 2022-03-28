import React from 'react';
import { useSelector } from 'react-redux';

import NavBar from '../../components/NavBar';
import PlayerProfile from '../../components/PlayerProfile';
import Button from '../../components/Button';
import ChatBox from '../../components/ChatBox';

import './Lobby.scss';

function Lobby() {
  const data = useSelector((player) => player.player);

  return (
    <div className="lobby-container">
      <NavBar />
      <PlayerProfile
        profileImg={data.picture}
        nickName={data.nombre}
        partidasJugadas={data.partidasjugadas}
        Partidasganadas={data.partidasganadas}
      />

      <div className="lobby-container__game-option">
        <Button name="crear partida aleatoria" type="button" />
        <Button name="crear partida aleatoria" type="button" />
        <Button name="crear partida aleatoria" type="button" />
      </div>
      <ChatBox />
    </div>
  );
}

export default Lobby;
