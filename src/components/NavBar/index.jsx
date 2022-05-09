import React from 'react';
import { NavLink } from 'react-router-dom';
import { Divide as Hamburger } from 'hamburger-react';
import {
  EDIT_ROUTE, HOME_ROUTE, LOGO, HELP, DONATION_ROUTE,
} from '../Constans/Routes';

import './NavBar.scss';

function NavBar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);

  const aLink = [
    {
      id: 0,
      name: 'configuración',
      route: EDIT_ROUTE,
    },
    {
      id: 1,
      name: '¿Cómo jugar?',
      route: HELP,
    },
    {
      id: 2,
      name: 'Invítanos a un café',
      route: DONATION_ROUTE,
    },
    {
      id: 3,
      name: 'salir',
      route: HOME_ROUTE,
      logout: () => {
        localStorage.removeItem('token');
      },

    },
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setShowMenu(!showMenu);
  };

  return (
    <nav className="nav-Container">
      <figure className="nav-container__logo">
        <img src={LOGO} alt="logo" />
      </figure>

      <ul className="nav-container__nav">
        {aLink.map((link) => (
          <li key={link.id}>
            <NavLink to={link.route} onClick={link.logout}>{link.name}</NavLink>
          </li>
        ))}
      </ul>

      <div className="nav-container__nav-mobile">
        <span className="nav-container__hamburger">
          <Hamburger color="#FFFFFF" toggle={handleToggle} toggled={isOpen} />
        </span>
        <div className={`nav-container__menu-mobile ${!showMenu && 'hidden'}`}>
          <ul>
            {
              showMenu ? (
                aLink.map((link) => (
                  <li key={link.id}>
                    <NavLink to={link.route} onClick={link.logout}>{link.name}</NavLink>
                  </li>
                ))
              ) : null
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
