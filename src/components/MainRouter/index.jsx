import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  HOME_ROUTE, REGISTER_ROUTE, EDIT_ROUTE, CHAT_ROUTE, GAME_ROUTE, LOBBY_ROUTE, PAGENOTFOUND404,
  HELP, ACTIVATE_USER, DONATION_ROUTE, RECOVERY_ROUTE, ONE_PLAYER, TWO_PLAYERS,
} from '../Constans/Routes';
import Register from '../../page/Register';
import Home from '../../page/Home';
import Edition from '../../page/Edition';
import ChatBox from '../ChatBox';
import Game from '../../page/Game';
import OnePlayer from '../../page/Games/OnePlayer';
import Lobby from '../../page/Lobby';
import NotFound404 from '../../page/NotFound404';
import Help from '../../page/Help';
import RegisterValidation from '../../page/RegisterValidation';
import Donation from '../../page/Donation';
import PasswordRecovery from '../../page/PasswordRecovery';
import TwoPlayers from '../../page/Games/TwoPlayers';

function Mainrouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={REGISTER_ROUTE} element={<Register />} />
        <Route path={EDIT_ROUTE} element={<Edition />} />
        <Route path={CHAT_ROUTE} element={<ChatBox />} />
        <Route path={GAME_ROUTE} element={<Game />} />
        <Route path={`${ONE_PLAYER}/:id`} element={<OnePlayer />} />
        <Route path={`${TWO_PLAYERS}/:id`} element={<TwoPlayers />} />
        <Route path={LOBBY_ROUTE} element={<Lobby />} />
        <Route path={PAGENOTFOUND404} element={<NotFound404 />} />
        <Route path={HELP} element={<Help />} />
        <Route path={ACTIVATE_USER} element={<RegisterValidation />} />
        <Route path={DONATION_ROUTE} element={<Donation />} />
        <Route path={RECOVERY_ROUTE} element={<PasswordRecovery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Mainrouter;
