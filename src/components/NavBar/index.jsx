import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  EDIT_ROUTE, HOME_ROUTE, LOGO, HELP,
} from '../Constans/Routes';

import './NavBar.scss';

function NavBar() {
  const aLink = [
    {
      id: 0,
      name: 'configuracion',
      route: EDIT_ROUTE,
    },
    {
      id: 1,
      name: 'salir',
      route: HOME_ROUTE,
      logout: () => {
        localStorage.removeItem('token');
      },

    },
    {
      id: 2,
      name: 'Help',
      route: HELP,
    },
  ];

  return (
    <nav className="nav-Container">
      <figure className="nav-container__logo">
        <img src={LOGO} alt="logo" />
      </figure>

      <ul>
        {aLink.map((link) => (
          <li key={link.id}>
            <NavLink to={link.route} onClick={link.logout}>{link.name}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
