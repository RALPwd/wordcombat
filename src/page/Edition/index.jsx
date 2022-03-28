/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import logo from '../../assets/img/logo word combat.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CardPresentation from '../../components/CardPresentation';

function Edition() {
  const data = useSelector((perfil) => perfil.player);
  const [formInfo, setFormInfo] = useState(data);

  useEffect(() => {
    // await setFormInfo(data);
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormInfo({ ...formInfo, [name]: value });
  }

  const handlerSubmitForm = (event) => {
    event.preventDefault();
  };

  return (
    <CardPresentation
      logo={logo}
      title="Perfíl del Jugador"
      handleSubmit={handlerSubmitForm}
    >
      <img src={logo} alt="" width="50px" height="30px" />

      <Input
        type="text"
        name="nick"
        value={formInfo.nick}
        placeholder="Nick"
        onChange={handleChange}
      />

      <Input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formInfo.nombre}
        onChange={handleChange}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="name">Fecha de nacimiento</label>
      <Input
        type="date"
        name="birthday"
        placeholder="name"
        value={formInfo.birthday}
        onChange={handleChange}
      />

      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formInfo.email}
        onChange={handleChange}
      />

      <Input
        type="text"
        name="picture"
        placeholder="Avatar"
        value={formInfo.picture}
        onChange={handleChange}
      />

      <Input
        type="password"
        name="password"
        placeholder="Nueva Contrasena"
        onChange={handleChange}
      />

      <Input
        type="password"
        name="ConfirmPassword"
        placeholder="Confirmfar Contrasena"
        onChange={handleChange}
      />
      <Button type="submit" name="Guardar" />
    </CardPresentation>
  );
}

export default Edition;
