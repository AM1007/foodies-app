import clsx from 'clsx';
import styles from './Button.module.css';
import variantStyles from './buttonVariants.module.css';

const Button = ({
  type = 'button',
  disabled = false,
  variant = 'dark',
  onClick,
  className = '',
  children,
}) => {
  const isInactive = variant === 'inactive';

  const clickHandler = event => {
    if (onClick && !disabled && !isInactive) {
      onClick(event);
    }
  };

  const btnClassName = clsx(styles.button, variantStyles[variant], className);

  return (
    <button
      type={type}
      disabled={disabled || isInactive}
      onClick={clickHandler}
      className={btnClassName}
    >
      {children}
    </button>
  );
};

export default Button;
