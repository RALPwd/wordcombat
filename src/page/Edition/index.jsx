/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Modal from 'react-modal';
import {
  saveEditProfile, saveAvatar, sessionPlayer, saveEditPassword,
} from '../../services/player';

import logo from '../../assets/img/logo word combat.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CardPresentation from '../../components/CardPresentation';
import { Update } from '../../Store/Actions';

function Edition() {
  const dispatch = useDispatch();
  const data = useSelector((perfil) => perfil.player);
  const [formInfo, setFormInfo] = useState(data);
  const [formPassword, setFormPassword] = useState({});
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [message, setMessage] = useState('');
  const [messagePassword, setMessagePasswodr] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [image, setImage] = useState(null);

  const session = async () => {
    Modal.setAppElement('#root');
    const player = await sessionPlayer();
    const { _doc } = player;

    dispatch(Update(_doc));
    setFormInfo(_doc);
  };

  useEffect(() => {
    session();
  }, []);

  const messageValidation = (mess, visible) => {
    setMessage(mess);
    setIsVisible(visible);
  };
  const messageValidationPassword = (mess, visible) => {
    setMessagePasswodr(mess);
    setIsVisible(visible);
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setFormInfo({ ...formInfo, [name]: value });
    setIsVisible(false);
  }

  function handleChangePassword(event) {
    const { name, value } = event.target;
    setFormPassword({ ...formPassword, [name]: value });
    setIsVisible(false);
  }

  const handleShowImage = (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    setAvatar(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '250px',
      height: '250px',
    },
  };

  const handlerCloseModal = () => {
    setModalIsOpen(false);
    setMessagePasswodr('');
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!formPassword.password || !formPassword.oldpassword || !formPassword.confirmpassword) {
      messageValidationPassword('ningun campo puede estar vacio', true);
    } else if (formPassword.password !== formPassword.confirmpassword) {
      messageValidationPassword('las nueva contrasena no coinciden', true);
    } else {
      const passwords = {
        oldpassword: formPassword.oldpassword,
        password: formPassword.password,
      };
      const result = await saveEditPassword(passwords);
      messageValidationPassword(result.message, true);
    }
  };

  const handlerSubmitForm = async (event) => {
    event.preventDefault();
    if ((formInfo.name.trim() === '') || (formInfo.nick.trim() === '')) {
      messageValidation('Es obligatorio diligenciar su Nick y Nombre para guardar el perfíl', true);
    } else {
      const resp = await saveEditProfile(formInfo);

      if (avatar) {
        const formData = new FormData();
        formData.append('file', avatar);
        await saveAvatar(formData);
      }

      if (resp.status === 202) {
        messageValidation(resp.message, true);
      } else {
        messageValidation('Se presentó un problema al guardar el perfil. consulte al administrador del sistema', true);
      }
    }
  };

  return (
    <div>
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
        <Button type="button" name="Cambiar Contrasena" onClick={() => { setModalIsOpen(true); setMessage(''); }} />

      </CardPresentation>

      <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={handlerCloseModal}>
        <form onSubmit={handleSubmitPassword}>
          <Input
            type="password"
            name="oldpassword"
            placeholder="Contrasena actual"
            value={formPassword.oldpassword}
            onChange={handleChangePassword}
          />
          <Input
            type="password"
            name="password"
            placeholder="Nueva contrasena"
            value={formPassword.password}
            onChange={handleChangePassword}
          />
          <Input
            type="password"
            name="confirmpassword"
            placeholder="confirma contrasena"
            value={formPassword.confirmpassword}
            onChange={handleChangePassword}
          />
          <button type="submit">Cambiar contrasena</button>
          <h4 className={isVisible ? 'show' : 'hide'}>
            {messagePassword}
          </h4>

        </form>
      </Modal>
    </div>

  );
}

export default Edition;
