import React from 'react';
import Proptypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Letter.module.scss';

const classes = classNames.bind(styles);

export default function Letter({ value, status }) {
  const boxStatus = classes({
    correct: status === 'correct',
    present: status === 'present',
    absent: status === 'absent',
    empty: status === 'empty',
    edit: status === 'edit',
  });
  return <div className={boxStatus}>{value}</div>;
}

Letter.propTypes = {
  value: Proptypes.string,
  status: Proptypes.string,
};

Letter.defaultProps = {
  value: '',
  status: 'edit',
};
