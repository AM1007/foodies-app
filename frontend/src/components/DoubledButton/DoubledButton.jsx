import clsx from 'clsx';
import Button from '../Button/Button';
import styles from './DoubledButton.module.css';

const DoubledButton = ({
  leftLabel = 'SIGN IN',
  rightLabel = 'SIGN UP',
  active = 'right',
  onLeftClick,
  onRightClick,
  className,
}) => {
  return (
    <div className={styles.doubledContainer}>
      <Button
        type="button"
        variant={active === 'left' ? 'dark' : 'white'}
        onClick={onLeftClick}
        className={clsx(
          styles.doubledButton,
          active === 'left' && styles.doubledActive,
          className,
        )}
      >
        {leftLabel}
      </Button>
      <Button
        type="button"
        variant={active === 'right' ? 'dark' : 'white'}
        onClick={onRightClick}
        className={clsx(
          styles.doubledButton,
          active === 'right' && styles.doubledActive,
          className,
        )}
      >
        {rightLabel}
      </Button>
    </div>
  );
};

export default DoubledButton;
