import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  HOME_ROUTE, REGISTER_ROUTE, EDIT_ROUTE, CHAT_ROUTE, GAME_ROUTE, LOBBY_ROUTE, PAGENOTFOUND404,
  HELP,
} from '../Constans/Routes';
import Register from '../../page/Register';
import Home from '../../page/Home';
import Edition from '../../page/Edition';
import ChatBox from '../ChatBox';
import Game from '../../page/Game';
import Lobby from '../../page/Lobby';
import NotFound404 from '../../page/NotFound404';
import Help from '../../page/Help';

function Mainrouter() {
  const [loginUser, setLoginUser] = useState({});
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_ROUTE} element={<Home setLogingUser={setLoginUser} />} />
        <Route path={REGISTER_ROUTE} element={<Register />} />
        <Route path={EDIT_ROUTE} element={<Edition />} />
        <Route path={CHAT_ROUTE} element={<ChatBox />} />
        <Route path={GAME_ROUTE} element={<Game />} />
        <Route path={LOBBY_ROUTE} element={<Lobby user={loginUser} />} />
        <Route path={PAGENOTFOUND404} element={<NotFound404 />} />
        <Route path={HELP} element={<Help />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Mainrouter;
