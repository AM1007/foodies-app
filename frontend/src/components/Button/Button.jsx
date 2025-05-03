import React from 'react';
import styles from './Button.module.css';

const Button = ({ onClick, className = '', children }) => {
  const clickHandler = event => {
    if (onClick) {
      onClick(event);
    }
  };

  const btnClassName = className || styles.button;

  return (
    <button type="type" onClick={clickHandler} className={btnClassName}>
      {children}
    </button>
  );
};

export default Button;
