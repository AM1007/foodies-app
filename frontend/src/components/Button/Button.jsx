import styles from './Button.module.css';

const Button = ({
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  children,
}) => {
  const clickHandler = event => {
    if (onClick) {
      onClick(event);
    }
  };

  const btnClassName = className || styles.button;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={clickHandler}
      className={btnClassName}
    >
      {children}
    </button>
  );
};

export default Button;
