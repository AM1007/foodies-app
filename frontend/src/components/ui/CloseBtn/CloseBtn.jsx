import icons from '../../../icons/sprite.svg';
import styles from './CloseBtn.module.css';

const CloseBtn = ({ onClick }) => {
  return (
    <button className={styles.closeBtn} onClick={onClick}>
      <svg className={styles.closeIcon}>
        <use href={`${icons}#close`} />
      </svg>
    </button>
  );
};

export default CloseBtn;
