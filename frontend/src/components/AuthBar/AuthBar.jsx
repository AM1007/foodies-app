import React from 'react';
import Button from '../Button/Button.jsx';
import styles from './AuthBar.module.css';
import { useModal } from '../../hooks/useModal.js';

const AuthBar = () => {
  const { openModal } = useModal();

  return (
    <div className={styles.buttons}>
      <Button
        className={`${styles.button} ${styles.signIn}`}
        onClick={() => openModal('signin')}
      >
        SIGN IN
      </Button>
      <Button
        className={`${styles.button} ${styles.signUp}`}
        onClick={() => openModal('signup')}
      >
        SIGN UP
      </Button>
      {/* <Button onClick={() => openModal('logout')}>Log Out</Button> */}
    </div>
  );
};

export default AuthBar;
