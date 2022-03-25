import React from 'react';
import NavBar from '../../components/NavBar';

function NotFound404() {
  return (
    <div className="lobby-container">
      <NavBar />
      <div>
        <img src="../assets/logo word combat.png" alt="Logo" />
      </div>
      <div>
        <h1>404 Page not found!!!!</h1>
      </div>
    </div>
  );
}

export default NotFound404;
