import React, { useState } from 'react';
import logo from '../../assets/img/logo word combat.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CardPresentation from '../../components/CardPresentation';

function ChangePassword() {
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
      title="Cambio de contraseña"
      handleSubmit={handlerSubmitForm}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="OldPassword">Contraseña anterior</label>
      <Input
        type="password"
        name="OldPassword"
        placeholder=""
        onChange={handleChange}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="NewPassword">Nueva contraseña</label>
      <Input
        type="password"
        name="NewPassword"
        placeholder=""
        onChange={handleChange}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="ConfirmPassword">Confirme contraseña</label>
      <Input
        type="password"
        name="ConfirmPassword"
        placeholder=""
        onChange={handleChange}
      />
      <Button type="submit" name="Guardar" />
    </CardPresentation>
  );
}

export default ChangePassword;
