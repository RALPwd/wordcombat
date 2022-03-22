import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { REGISTER_ROUTE } from '../../components/Constans/Routes';

import logo from '../../assets/img/logo word combat.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CardPresentation from '../../components/CardPresentation';

import { getLoginUser } from '../../services/player';

// eslint-disable-next-line react/prop-types
function Home() {
  const navigate = useNavigate();
  const [formInfo, setFormInfo] = useState([]);

  const getEmail = async (email) => {
    const data = await getLoginUser(email);
    return data;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInfo({ ...formInfo, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await getEmail(formInfo.email);

    if (formInfo.password === data.password) {
      navigate(REGISTER_ROUTE);
    }
  };

  return (
    <CardPresentation logo={logo} title="Login" handleSubmit={handleSubmit}>
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

      <Button type="submit" name="Login" />
      <Link to={REGISTER_ROUTE}>Registrate</Link>
    </CardPresentation>

  );
}

export default Home;
