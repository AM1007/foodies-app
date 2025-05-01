import React from 'react';
import styles from './Button.module.css';

const Button = ({ onClick, className = '', children }) => {
  const clickHandler = event => {
    if (onClick) {
      event.preventDefault();
      onClick(event);
    }
  };

  const btnClassName = className || styles.button;

  return (
    <button type="button" onClick={clickHandler} className={btnClassName}>
      {children}
    </button>
  );
};

export default Button;
