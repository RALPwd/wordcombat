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
    // eslint-disable-next-line react/prop-types

    if (formInfo.password === confirmPassWord) {
      await createPlayer(formInfo);
      document.getElementById('register-form').reset();
    } else {
      alert('contrasena no son iguales');
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
        name="name"
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
