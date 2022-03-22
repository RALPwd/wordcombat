import React, { useState } from 'react';

import logo from '../../assets/img/logo word combat.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { createPlayer } from '../../services/player';
import CardPresentation from '../../components/CardPresentation';
// eslint-disable-next-line react/prop-types
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
        ...formInfo, picture: './src/assets/img/logo word combat.png', partidasjugadas: 0, partidasganadas: 0, estado: 1,
      };
      await createPlayer(newPlayer);
      document.getElementById('register-form').reset();
    }
  };

  return (
    <CardPresentation logo={logo} title="Register" handleSubmit={handleSubmit}>

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="name">
        Nick
      </label>
      <Input
        type="text"
        name="nick"
        placeholder="name"
        onChange={handleChange}
      />

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="name">
        Nombre
      </label>
      <Input
        type="text"
        name="nombre"
        placeholder="name"
        onChange={handleChange}
      />

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="name">
        Fecha de nacimiento
      </label>
      <Input
        type="date"
        name="birthday"
        placeholder="name"
        onChange={handleChange}
      />

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="email">
        Email
      </label>
      <Input
        type="email"
        name="email"
        placeholder="email"
        onChange={handleChange}
      />

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="password">
        contraseña
      </label>
      <Input
        type="password"
        name="password"
        placeholder="contraseña"
        onChange={handleChange}
      />

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="Confirpassword">
        Confirmar contraseña
      </label>
      <Input
        type="password"
        name="password"
        placeholder="contrasena"
        onChange={(e) => setConfirmPassWord(e.target.value)}
      />

      <Button type="submit" name="REGISTRAR" />
    </CardPresentation>

  );
}

export default Register;
