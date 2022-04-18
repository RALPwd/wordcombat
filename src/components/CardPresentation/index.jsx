import React from 'react';
import './CardPresentation.scss';
import PropTypes from 'prop-types';

function CardPresentation({
  logo, title, handleSubmit, children, message, isVisible,
}) {
  return (
    <main>
      <div className="register-card">

        <img src={logo} alt="logo" className="register-card__logo" />
        <form onSubmit={handleSubmit} className="register-card__form" id="register-form">
          <h1 className="title">{title}</h1>
          {children}
          <h4 className={isVisible ? 'show' : 'hide'}>
            {message}
          </h4>

        </form>

      </div>
    </main>
  );
}
CardPresentation.defaultProps = {
  message: 'aquiva el mensaje',
  isVisible: false,
};

CardPresentation.propTypes = {
  logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool,

};

export default CardPresentation;
