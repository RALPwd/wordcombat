import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo word combat.png';
import CardPresentation from '../../components/CardPresentation';
import { ActivatePlayer } from '../../services/player';
import { HOME_ROUTE } from '../../components/Constans/Routes';

function RegisterValidation() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    ActivatePlayer(token);
    setTimeout(() => {
      navigate(HOME_ROUTE);
    }, 2000);
  }, []);
  return (
    <CardPresentation logo={logo} title="Cuenta activada pronto seras redirigido al lobby" handleSubmit={null} />

  );
}

export default RegisterValidation;
