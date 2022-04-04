/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveEditProfile } from '../../services/player';

import logo from '../../assets/img/logo word combat.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CardPresentation from '../../components/CardPresentation';
import { LOBBY_ROUTE } from '../../components/Constans/Routes';
import { Update } from '../../Store/Actions';

function Edition() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((perfil) => perfil.player);
  const [formInfo, setFormInfo] = useState(data);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormInfo({ ...formInfo, [name]: value });
  }

  const handlerSubmitForm = async (event) => {
    event.preventDefault();
    if ((formInfo.email.trim() === '') || (formInfo.name.trim() === '') || (formInfo.nick.trim() === '')) {
      alert('Es obligatorio diligenciar su Nick, Nombre y Correo electrónico para guardar el perfíl');
    } else {
      const resp = await saveEditProfile(formInfo);
      if (resp.status === 200) {
        alert('Perfíl guardado satisfactoriamente!!!');
        dispatch(Update(formInfo));
        navigate(LOBBY_ROUTE);
      } else {
        alert('Se presentó un problema al guardar el perfil. consulte al administrador del sistema');
      }
    }
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
        name="name"
        placeholder="Nombre"
        value={formInfo.name}
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

      <Button type="submit" name="Guardar" />
      <Button type="button" name="Cambiar Contrasena" />
    </CardPresentation>
  );
}

export default Edition;
