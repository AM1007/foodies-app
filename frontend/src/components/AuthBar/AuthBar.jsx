import { useState } from 'react';
import DoubledButton from '../DoubledButton/DoubledButton.jsx';
import styles from './AuthBar.module.css';
import { useModal } from '../../hooks/useModal.js';

const AuthBar = () => {
  const { openModal } = useModal();
  const [active, setActive] = useState('right');

  const handleLeftClick = () => {
    console.log('Open Sign In Modal'); // Додав лог для перевірки
    setActive('left');
    openModal('signin'); // Виправив на 'signin', оскільки було 'signIn'
  };

  const handleRightClick = () => {
    console.log('Open Sign Up Modal'); // Додав лог для перевірки
    setActive('right');
    openModal('signup'); // Виправив на 'signup', оскільки було 'signUp'
  };

  return (
    <div className={styles.buttons}>
      <DoubledButton
        active={active}
        onLeftClick={handleLeftClick}
        onRightClick={handleRightClick}
      />
    </div>
  );
};

export default AuthBar;
