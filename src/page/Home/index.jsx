/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { REGISTER_ROUTE, LOBBY_ROUTE, RECOVERY_ROUTE } from '../../components/Constans/Routes';

import logo from '../../assets/img/WORD_COMBAT_LOGO_WHITE.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CardPresentation from '../../components/CardPresentation';

import { getLoginUser } from '../../services/player';

// eslint-disable-next-line react/prop-types
function Home() {
  const navigate = useNavigate();
  const [formInfo, setFormInfo] = useState([]);

  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (localStorage.token) {
      navigate(LOBBY_ROUTE);
    }
  }, []);

  const mesasgeValidation = (mess, visible) => {
    setMessage(mess);
    setIsVisible(visible);
  };

  const getEmail = async (form) => {
    const data = await getLoginUser(form);
    return data;
  };

  const handleChange = (event) => {
    setIsVisible(false);
    const { name, value } = event.target;
    setFormInfo({ ...formInfo, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await getEmail(formInfo);
    if (!formInfo.email || !formInfo.password) {
      mesasgeValidation('Ninguno de los campos puede estar vacio', true);
    } else if (data.status === 401) {
      mesasgeValidation(data.message, true);
    } else {
      localStorage.setItem('token', data.token);
      navigate(LOBBY_ROUTE);
    }
  };

  return (
    <CardPresentation logo={logo} title="Inicio de sesión" handleSubmit={handleSubmit} message={message} isVisible={isVisible}>

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
        data-cy="password"
      />

      <Button type="submit" name="Login" data-cy="login" />
      <Link to={REGISTER_ROUTE} style={{ paddingBottom: '10px' }}>Registrate</Link>
      <Link to={RECOVERY_ROUTE}>Olvidaste tu contraseña?</Link>
    </CardPresentation>

  );
}

export default Home;
