import React from 'react';
import PropTypes from 'prop-types';
import { FaKeyboard, FaTrophy, FaChartPie } from 'react-icons/fa';

import './playerProfile.scss';

function PlayerProfile({
  nickName, name, partidasJugadas, Partidasganadas, profileImg,
}) {
  return (
    <div className="lobby-container__game">
      <div className="lobby-container__player-profile">
        <figure className="lobby-container__player-profile__avatar">
          <img src={profileImg} alt="avatar" />
        </figure>

        <section className="lobby-container__player-profile__information">
          <div>
            <h2>{nickName}</h2>
            <h4>{name}</h4>
          </div>
          <article>
            <p>
              <FaKeyboard />
              Partidas:
              {' '}
              {partidasJugadas}
            </p>
            <p>
              <FaTrophy />
              Victorias:
              {' '}
              {Partidasganadas}

            </p>
            <p>
              <FaChartPie />
              Winrate:
              {' '}
              { partidasJugadas === 0
                ? 0
                : Math.round((Partidasganadas * 100) / partidasJugadas)}
              %
            </p>
          </article>
        </section>
        <i>?</i>
      </div>
    </div>
  );
}

PlayerProfile.propTypes = {
  nickName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  partidasJugadas: PropTypes.number.isRequired,
  profileImg: PropTypes.string.isRequired,
  Partidasganadas: PropTypes.number.isRequired,
};

export default PlayerProfile;
