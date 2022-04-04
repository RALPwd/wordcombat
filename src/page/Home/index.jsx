/* eslint-disable no-alert */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Update } from '../../Store/Actions';

import { REGISTER_ROUTE, LOBBY_ROUTE } from '../../components/Constans/Routes';

import logo from '../../assets/img/logo word combat.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CardPresentation from '../../components/CardPresentation';

import { getLoginUser } from '../../services/player';

// eslint-disable-next-line react/prop-types
function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formInfo, setFormInfo] = useState([]);

  const getEmail = async (form) => {
    const data = await getLoginUser(form);
    return data;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInfo({ ...formInfo, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await getEmail(formInfo);

    if (data) {
      dispatch(Update(data));
      navigate(LOBBY_ROUTE);
    } else {
      alert('correo o contrasena invalido');
    }
  };

  return (
    <CardPresentation logo={logo} title="Login" handleSubmit={handleSubmit}>

      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formInfo.email}
        onChange={handleChange}
      />

      <Input
        type="password"
        name="password"
        placeholder="contraseña"
        value={formInfo.password}
        onChange={handleChange}
      />

      <Button type="submit" name="Login" />
      <Link to={REGISTER_ROUTE}>Registrate</Link>
      <Link to={REGISTER_ROUTE}>Olvidaste tu contraseña?</Link>
    </CardPresentation>

  );
}

export default Home;
