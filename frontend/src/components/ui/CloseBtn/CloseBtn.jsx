import clsx from 'clsx';
import icons from '../../../icons/sprite.svg';
import styles from './BurgerBtn.module.css';

const CloseBtn = ({ onClick }) => {
  return (
    <button className={styles.closeBtn} onClick={onClick}>
      <svg>
        <use href={`${icons}#burger`} />
      </svg>
    </button>
  );
};

export default CloseBtn;
