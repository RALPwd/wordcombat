import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  HOME_ROUTE, REGISTER_ROUTE, EDIT_ROUTE, CHANGE_PASSWORD_ROUTE,
} from '../Constans/Routes';
import Register from '../../page/Register';
import Home from '../../page/Home';
import Edition from '../../page/Edition';
import ChangePassword from '../../page/ChangePassword';

function Mainrouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={REGISTER_ROUTE} element={<Register />} />
        <Route path={EDIT_ROUTE} element={<Edition />} />
        <Route path={CHANGE_PASSWORD_ROUTE} element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Mainrouter;
