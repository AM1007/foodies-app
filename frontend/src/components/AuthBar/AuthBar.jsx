import DoubledButton from '../DoubledButton/DoubledButton.jsx';
import styles from './AuthBar.module.css';
import { useModal } from '../../hooks/useModal.js';

const AuthBar = () => {
  const { openModal, activeForm } = useModal();

  const handleLeftClick = () => {
    openModal('signin');
  };

  const handleRightClick = () => {
    openModal('signup');
  };

  return (
    <div className={styles.buttons}>
      <DoubledButton
        className={styles.button}
        active={activeForm === 'signin' ? 'left' : 'right'}
        onLeftClick={handleLeftClick}
        onRightClick={handleRightClick}
      />
    </div>
  );
};

export default AuthBar;
