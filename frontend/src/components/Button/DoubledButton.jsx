import clsx from 'clsx';
import styles from './Button.module.css';
import variantStyles from './buttonVariants.module.css';

const DoubledButton = ({
  leftLabel = 'SIGN IN',
  rightLabel = 'SIGN UP',
  active = 'left', // або 'right'
  onLeftClick,
  onRightClick,
}) => {
  return (
    <div className={variantStyles.doubledContainer}>
      <button
        className={clsx(
          styles.button,
          variantStyles.doubledWhite,
          active === 'left' && variantStyles.doubledActive,
        )}
        onClick={onLeftClick}
      >
        {leftLabel}
      </button>
      <button
        className={clsx(
          styles.button,
          variantStyles.doubledDark,
          active === 'right' && variantStyles.doubledActive,
        )}
        onClick={onRightClick}
      >
        {rightLabel}
      </button>
    </div>
  );
};

export default DoubledButton;

{
  /* <DoubledButton
  active="right"
  onLeftClick={() => setActive('left')}
  onRightClick={() => setActive('right')}
/>; */
}
