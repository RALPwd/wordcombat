/* eslint-disable no-alert */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE } from '../../components/Constans/Routes';

import logo from '../../assets/img/logo word combat.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { createPlayer } from '../../services/player';
import CardPresentation from '../../components/CardPresentation';

function Register() {
  const navigate = useNavigate();
  const [formInfo, setFormInfo] = useState([]);
  const [confirmPassWord, setConfirmPassWord] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInfo({ ...formInfo, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formInfo.password === confirmPassWord) {
      const newPlayer = {
        ...formInfo,
      };
      await createPlayer(newPlayer);
      navigate(HOME_ROUTE);
    } else { console.log('password not equal'); }
  };

  return (
    <CardPresentation logo={logo} title="Register" handleSubmit={handleSubmit}>

      <Input
        type="text"
        name="nick"
        placeholder="Nick"
        onChange={handleChange}
        value={formInfo.nick}
      />

      <Input
        type="text"
        name="name"
        placeholder="Nombre"
        onChange={handleChange}
        value={formInfo.name}
      />

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="name">
        Fecha de nacimiento
      </label>
      <Input
        type="date"
        name="birthday"
        onChange={handleChange}
        value={formInfo.birthday}
      />

      <Input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={formInfo.email}
      />

      <Input
        type="password"
        name="password"
        placeholder="Contraseña"
        onChange={handleChange}
        value={formInfo.password}
      />

      <Input
        type="password"
        name="password"
        placeholder="Confirmar Contrasena"
        onChange={(e) => setConfirmPassWord(e.target.value)}
        value={confirmPassWord}
      />

      <Button type="submit" name="REGISTRAR" />
    </CardPresentation>

  );
}

export default Register;
