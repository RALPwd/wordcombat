import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HOME_ROUTE, REGISTER_ROUTE } from '../Constans/Routes';
import Register from '../../page/Register';
import Home from '../../page/Home';

function Mainrouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={REGISTER_ROUTE} element={<Register />} />
        <Route path="invoices" element="" />
      </Routes>
    </BrowserRouter>
  );
}

export default Mainrouter;
