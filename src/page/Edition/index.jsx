import React, { useState } from 'react';
import logo from '../../assets/img/logo word combat.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CardPresentation from '../../components/CardPresentation';

function Edition() {
  const [formInfo, setFormInfo] = useState([]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInfo({ ...formInfo, [name]: value });
  };

  const handlerSubmitForm = (event) => {
    event.preventDefault();
  };

  return (
    <CardPresentation
      logo={logo}
      title="Ediciòn del perfìl"
      handleSubmit={handlerSubmitForm}
    >
      <img src={formInfo.picture} alt="Avatar" width="50px" height="50px" />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="name">Nick</label>
      <Input
        type="text"
        name="nick"
        placeholder="name"
        onChange={handleChange}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="name">Nombre</label>
      <Input
        type="text"
        name="nombre"
        placeholder="nick"
        onChange={handleChange}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="name">Fecha de nacimiento</label>
      <Input
        type="date"
        name="birthday"
        placeholder="name"
        onChange={handleChange}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="email">Email</label>
      <Input
        type="email"
        name="email"
        placeholder="email"
        onChange={handleChange}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="email">Avatar</label>
      <Input
        type="text"
        name="picture"
        placeholder="Avatar"
        onChange={handleChange}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="NewPassword">Nueva contraseña</label>
      <Input
        type="password"
        name="NewPassword"
        placeholder="contransena"
        onChange={handleChange}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="ConfirmPassword">Confirme contraseña</label>
      <Input
        type="password"
        name="ConfirmPassword"
        placeholder="contransena"
        onChange={handleChange}
      />
      <Button type="submit" name="Guardar" />
    </CardPresentation>
  );
}

export default Edition;
