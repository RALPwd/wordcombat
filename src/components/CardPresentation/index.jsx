import React from 'react';
import './CardPresentation.scss';

function CardPresentation({
  // eslint-disable-next-line react/prop-types
  logo, title, handleSubmit, children,
}) {
  return (
    <main>
      <div className="register-card">

        <img src={logo} alt="logo" className="register-card__logo" />
        <form onSubmit={handleSubmit} className="register-card__form" id="register-form">
          <h1 className="title">{title}</h1>
          {children}
        </form>

      </div>
    </main>
  );
}

export default CardPresentation;
