import React from 'react';
import './App.css';
import Register from './page/Register';
import data from './assets/data';

function App() {
  return (
    <Register data={data} />
  );
}

export default App;
