import clsx from 'clsx';
import icons from '../../../icons/sprite.svg';
import styles from './BurgerBtn.module.css';

const BurgerBtn = ({ onClick, isLightTheme }) => {
  return (
    <button className={styles.burgerBtn} onClick={onClick}>
      <svg
        className={clsx(
          styles.burgerIcon,
          isLightTheme ? styles.burgerLight : styles.burgerDark,
        )}
      >
        <use href={`${icons}#burger`} />
      </svg>
    </button>
  );
};

export default BurgerBtn;
