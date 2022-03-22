import React from 'react';
import './CardPresentation.scss';
import PropTypes from 'prop-types';

function CardPresentation({
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

CardPresentation.propTypes = {
  logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,

};

export default CardPresentation;
