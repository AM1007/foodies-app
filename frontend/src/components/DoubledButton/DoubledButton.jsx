import { useState } from 'react';
import clsx from 'clsx';
import Button from '../Button/Button';
import styles from './DoubledButton.module.css';

const DoubledButton = ({
  leftLabel = 'Sign in',
  rightLabel = 'Sign up',
  active = 'right',
  onLeftClick,
  onRightClick,
}) => {
  const [activeSide, setActiveSide] = useState(active);

  const handleLeftClick = () => {
    setActiveSide('left');
    if (onLeftClick) onLeftClick();
  };

  const handleRightClick = () => {
    setActiveSide('right');
    if (onRightClick) onRightClick();
  };

  return (
    <div className={styles.doubledContainer}>
      <Button
        type="button"
        variant={activeSide === 'left' ? 'dark' : 'white'}
        onClick={handleLeftClick}
        className={clsx(
          styles.doubledButton,
          activeSide === 'left' && styles.doubledActive,
        )}
      >
        {leftLabel}
      </Button>
      <Button
        type="button"
        variant={activeSide === 'right' ? 'dark' : 'white'}
        onClick={handleRightClick}
        className={clsx(
          styles.doubledButton,
          activeSide === 'right' && styles.doubledActive,
        )}
      >
        {rightLabel}
      </Button>
    </div>
  );
};

export default DoubledButton;
