import React from 'react';

function PlayerProfile({ profileImage, partidasJugadas, Partidasganadas }) {
  return (
     <div class="lobby-container__game">
        <div class="lobby-container__player-profile">
          <figure class="lobby-container__player-profile__avatar">
            <img " src=" ./img/mario.svg" alt="avatar" />
          </figure>

          <section class="lobby-container__player-profile__information">
            <h3>Mellito</h3>
            <article>
              <p>partidas jugadas: 120</p>
              <p>partidas ganadas: 60</p>
              <p>% de victoria: 50%</p>
            </article>
          </section>
          <i class="fa-solid fa-question"></i>
        </div>
      </div>
  );
}

export default PlayerProfile;
