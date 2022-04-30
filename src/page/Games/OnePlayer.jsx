import React from 'react';
import { useSelector } from 'react-redux';
import Game from '../Game';
import PlayerProfile from '../../components/PlayerProfile';
import styles from './GameStyles.module.scss';

export default function OnePlayer() {
  const player = useSelector((state) => state.player);

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
        <Game />
      </div>
    </div>
  );
}
