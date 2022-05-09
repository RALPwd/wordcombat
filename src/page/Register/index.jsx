/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HOME_ROUTE, LOBBY_ROUTE } from '../../components/Constans/Routes';

import logo from '../../assets/img/WORD_COMBAT_LOGO_WHITE.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { createPlayer } from '../../services/player';
import CardPresentation from '../../components/CardPresentation';

function Register() {
  const navigate = useNavigate();
  const [formInfo, setFormInfo] = useState([]);
  const [confirmPassWord, setConfirmPassWord] = useState('');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (localStorage.token) {
      navigate(LOBBY_ROUTE);
    }
  }, []);

  const mesasgeValidation = (mess, visible) => {
    setMessage(mess);
    setIsVisible(visible);
  };

  const handleChange = (event) => {
    setIsVisible(false);
    const { name, value } = event.target;
    setFormInfo({ ...formInfo, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formInfo.nick || !formInfo.name || !formInfo.email || !formInfo.birthday
      || !formInfo.password) {
      mesasgeValidation('Ninguno de los campos puede estar vacio', true);
    } else if (formInfo.password === confirmPassWord) {
      const newPlayer = {
        ...formInfo,
      };
      const respon = await createPlayer(newPlayer);
      if (respon.status === 400) {
        mesasgeValidation(respon.message, true);
      } else {
        mesasgeValidation('Registro exitoso porfavor revisa tu correo y activa  tu cuenta', true);
        setTimeout(() => {
          navigate(HOME_ROUTE);
        }, 3000);
      }
    } else { mesasgeValidation('Las contraseñas no coinciden', true); }
  };

  return (
    <CardPresentation logo={logo} title="Register" handleSubmit={handleSubmit} message={message} isVisible={isVisible}>
      <Link
        to={HOME_ROUTE}
        style={{
          position: 'absolute', top: '0', right: 0, padding: '10px 20px 10px 0', fontSize: '18px',
        }}
      >
        Volver a Home
      </Link>
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
