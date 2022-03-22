import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GAME_ROUTE, HOME_ROUTE, REGISTER_ROUTE } from '../Constans/Routes';
import Register from '../../page/Register';
import Home from '../../page/Home';
import Game from '../../page/Game';

function Mainrouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={REGISTER_ROUTE} element={<Register />} />
        <Route path={GAME_ROUTE} element={<Game />} />
        <Route path="invoices" element="" />
      </Routes>
    </BrowserRouter>
  );
}

export default Mainrouter;
