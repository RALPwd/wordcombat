import React, { useState } from 'react';
import logo from '../../assets/img/logo word combat.png';

// eslint-disable-next-line react/prop-types
function Register({ data }) {
  const [formInfo, setFormInfo] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInfo({ ...formInfo, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line react/prop-types
    data.push(formInfo);
    console.log(data);
  };

  return (
    <div>
      <img src={logo} alt="logo" />
      <h3>Register</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Enter your name:
          <input
            type="text"
            name="name"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Enter your email:
          <input
            type="email"
            name="email"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Enter your password:
          <input
            type="password"
            name="password"
            onChange={handleChange}
          />
        </label>

        <input type="submit" />
      </form>

    </div>
  );
}

export default Register;
