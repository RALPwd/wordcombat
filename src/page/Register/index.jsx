import React, { useState } from 'react';
import logo from '../../assets/img/logo word combat.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import './register.scss';
import { createPlayer } from '../../services/player';

// eslint-disable-next-line react/prop-types
function Register() {
  const [formInfo, setFormInfo] = useState([]);
  const [confirmPassWord, setConfirmPassWord] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInfo({ ...formInfo, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // eslint-disable-next-line react/prop-types
    const data = await createPlayer(formInfo);
    alert(data);
    console.log(confirmPassWord);
  };

  return (
    <main>
      <div className="register-card">

        <img src={logo} alt="logo" className="register-card__logo" />
        <h1 className="register-card__title">Register</h1>

        <form onSubmit={handleSubmit} className="register-card__form">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="name">
            Nick
          </label>
          <Input
            type="text"
            name="name"
            placeholder="name"
            onChange={handleChange}
          />

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
            password
          </label>
          <Input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />

          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="Confirpassword">
            Confirm password
          </label>
          <Input
            type="password"
            name="password"
            placeholder="confirm password"
            onChange={(e) => setConfirmPassWord(e.target.value)}
          />

          <Button type="submit" name="REGISTRAR" />
        </form>

      </div>
    </main>

  );
}

export default Register;
