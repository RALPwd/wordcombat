import React from 'react';
import PropTypes from 'prop-types';

import './playerProfile.scss';

function PlayerProfile({
  nickName, partidasJugadas, Partidasganadas, profileImg,
}) {
  return (
    <div className="lobby-container__game">
      <div className="lobby-container__player-profile">
        <figure className="lobby-container__player-profile__avatar">
          <img src={profileImg} alt="avatar" />
        </figure>

        <section className="lobby-container__player-profile__information">
          <h3>{nickName}</h3>
          <article>
            <p>
              partidas jugadas:
              {' '}
              {partidasJugadas}
            </p>
            <p>
              partidas ganadas:
              {' '}
              {Partidasganadas}

            </p>
            <p>
              % de victorias:
              {' '}
              {Math.round((Partidasganadas * 100) / partidasJugadas)}
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
  partidasJugadas: PropTypes.number.isRequired,
  profileImg: PropTypes.string.isRequired,
  Partidasganadas: PropTypes.number.isRequired,
};

export default PlayerProfile;
