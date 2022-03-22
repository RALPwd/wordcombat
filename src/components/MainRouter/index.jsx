import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  HOME_ROUTE, REGISTER_ROUTE, EDIT_ROUTE, CHANGE_PASSWORD_ROUTE, CHAT_ROUTE,
} from '../Constans/Routes';
import Register from '../../page/Register';
import Home from '../../page/Home';
import Edition from '../../page/Edition';
import ChangePassword from '../../page/ChangePassword';
import ChatBox from '../ChatBox';

function Mainrouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={REGISTER_ROUTE} element={<Register />} />
        <Route path={EDIT_ROUTE} element={<Edition />} />
        <Route path={CHANGE_PASSWORD_ROUTE} element={<ChangePassword />} />
        <Route path={CHAT_ROUTE} element={<ChatBox />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Mainrouter;
