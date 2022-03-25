import React from 'react';

import PropTypes from 'prop-types';
import NavBar from '../../components/NavBar';
import PlayerProfile from '../../components/PlayerProfile';
import Button from '../../components/Button';
import ChatBox from '../../components/ChatBox';

import './Lobby.scss';

function Lobby({
  user: {
    picture, nombre, partidasjugadas, partidasganadas,
  },
}) {
  return (
    <div className="lobby-container">
      <NavBar />
      <PlayerProfile
        profileImg={picture}
        nickName={nombre}
        partidasJugadas={partidasjugadas}
        Partidasganadas={partidasganadas}
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

Lobby.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
};

export default Lobby;
