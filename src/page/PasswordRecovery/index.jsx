import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CardPresentation from '../../components/CardPresentation';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { HOME_ROUTE, LOGO, LOBBY_ROUTE } from '../../components/Constans/Routes';
import { passworRecovery } from '../../services/player';

function PasswordRecovery() {
  const [formInfo, setFormInfo] = useState({});
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.token) {
      navigate(LOBBY_ROUTE);
    }
  }, []);

  const messageValidation = (mess, visible) => {
    setMessage(mess);
    setIsVisible(visible);
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setFormInfo({ ...formInfo, [name]: value });
    setIsVisible(false);
  }

  const handlerSubmitForm = async (event) => {
    event.preventDefault();
    if (!formInfo.email || !formInfo.birthday || !formInfo.nick) {
      messageValidation('los datos son incorrectos verfica porfavor', true);
    } else {
      const send = await passworRecovery(formInfo);
      messageValidation(send.message, true);
    }
  };

  return (

    <CardPresentation
      logo={LOGO}
      title="Recuperacion de contrasena"
      handleSubmit={handlerSubmitForm}
      message={message}
      isVisible={isVisible}
    >
      <Link
        to={HOME_ROUTE}
        style={{
          position: 'absolute', top: '0', right: 0, padding: '10px 20px 10px 0', fontSize: '18px',
        }}
      >
        Volver al Home
      </Link>

      <Input
        type="email"
        name="email"
        value={formInfo.email}
        placeholder="email"
        // eslint-disable-next-line react/jsx-no-bind
        onChange={handleChange}
      />

      <Input
        type="date"
        name="birthday"
        // eslint-disable-next-line react/jsx-no-bind
        onChange={handleChange}
        value={formInfo.birthday}
      />
      <Input
        type="text"
        name="nick"
        placeholder="nick"
        value={formInfo.nick}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={handleChange}
      />

      <Button type="submit" name="Recuperar contrasena" />

    </CardPresentation>

  );
}

export default PasswordRecovery;
