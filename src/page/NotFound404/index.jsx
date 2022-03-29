import React from 'react';
import { LOGO } from '../../components/Constans/Routes';
import CardPresentation from '../../components/CardPresentation';

function NotFound404() {
  return (
    <CardPresentation logo={LOGO} title="404 Page not found!!!!" handleSubmit={null} />
  );
}

export default NotFound404;
