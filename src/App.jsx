import React from 'react';
import './App.css';
<<<<<<< HEAD
import Register from './page/Register';
import data from './assets/data';

function App() {
  return (
    <Register data={data} />
=======
import Input from './components/Input';
import Button from './components/Button';
import ChatBox from './components/ChatBox';

function App() {
  return (
    <div className="App">
      <Input
        label="Nick o correo"
        type="text"
        placeholder="ingresa tu usuario"
        id="usuario"
      />
      <Input
        label="password"
        type="password"
        placeholder="ingresa tu contrasena"
        id="usuario"
      />
      <Button name="jugar solo" type="Button" />
      <ChatBox />
    </div>
>>>>>>> develop
  );
}

export default App;
