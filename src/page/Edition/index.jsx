/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { saveEditProfile, saveAvatar } from '../../services/player';

import logo from '../../assets/img/logo word combat.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CardPresentation from '../../components/CardPresentation';
import { Update } from '../../Store/Actions';

function Edition() {
  const dispatch = useDispatch();
  const data = useSelector((perfil) => perfil.player);
  const [formInfo, setFormInfo] = useState(data);
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [image, setImage] = useState(null);

  const messageValidation = (mess, visible) => {
    setMessage(mess);
    setIsVisible(visible);
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setFormInfo({ ...formInfo, [name]: value });
    setIsVisible(false);
  }

  const handleShowImage = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const handlerSubmitForm = async (event) => {
    event.preventDefault();
    if ((formInfo.name.trim() === '') || (formInfo.nick.trim() === '')) {
      messageValidation('Es obligatorio diligenciar su Nick y Nombre para guardar el perfíl', true);
    } else {
      const resp = await saveEditProfile(formInfo);
      const formData = new FormData();
      formData.append('file', avatar);
      await saveAvatar(formData);
      if (resp.status === 202) {
        messageValidation(resp.message, true);
        dispatch(Update(formInfo));
      } else {
        messageValidation('Se presentó un problema al guardar el perfil. consulte al administrador del sistema', true);
      }
    }
  };

  return (
    <CardPresentation
      logo={logo}
      title="Perfíl del Jugador"
      handleSubmit={handlerSubmitForm}
      message={message}
      isVisible={isVisible}
    >
      <img src={image || formInfo.picture} alt="" width="100px" height="100px" />

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
        value={moment(formInfo.birthday).format('YYYY-MM-DD')}
        onChange={handleChange}
      />

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="picture">Imagen de perfil</label>
      <input type="file" name="avatar" id="avatar" onChange={handleShowImage} accept="image/*" />

      <Button type="submit" name="Guardar" />
      <Button type="button" name="Cambiar Contrasena" />
    </CardPresentation>
  );
}

export default Edition;
