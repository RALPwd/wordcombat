/* eslint-disable no-alert */
import React, { useState } from 'react';

import logo from '../../assets/img/logo word combat.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { createPlayer } from '../../services/player';
import CardPresentation from '../../components/CardPresentation';

import { LOGO } from '../../components/Constans/Routes';

function Register() {
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
        ...formInfo, picture: LOGO, partidasjugadas: 0, partidasganadas: 0, estado: 1,
      };
      await createPlayer(newPlayer);
      document.getElementById('register-form').reset();
    }
  };

  return (
    <CardPresentation logo={logo} title="Register" handleSubmit={handleSubmit}>

      <Input
        type="text"
        name="nick"
        placeholder="Nick"
        onChange={handleChange}
      />

      <Input
        type="text"
        name="nombre"
        placeholder="Nombre"
        onChange={handleChange}
      />

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="name">
        Fecha de nacimiento
      </label>
      <Input
        type="date"
        name="birthday"
        onChange={handleChange}
      />

      <Input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <Input
        type="password"
        name="password"
        placeholder="Contraseña"
        onChange={handleChange}
      />

      <Input
        type="password"
        name="password"
        placeholder="Confirmar Contrasena"
        onChange={(e) => setConfirmPassWord(e.target.value)}
      />

      <Button type="submit" name="REGISTRAR" />
    </CardPresentation>

  );
}

export default Register;
