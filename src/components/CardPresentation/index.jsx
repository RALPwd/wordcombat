import React from 'react';
import './CardPresentation.scss';
import PropTypes from 'prop-types';

function CardPresentation({
  logo, title, handleSubmit, children, message, isVisible,
}) {
  return (
    <main>
      <div className="register-card">
        <div className="register-card__logocontainer">
          <img src={logo} alt="logo" className="register-card__logo" />
        </div>
        <form onSubmit={handleSubmit} className="register-card__form" id="register-form">
          <h2 className="title">{title}</h2>
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
  message: '',
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
