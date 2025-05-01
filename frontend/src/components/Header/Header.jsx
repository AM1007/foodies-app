import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.jsx';
import styles from './Header.module.css';
import Button from '../Button/Button';
import { useModal } from '../../context/ModalContext';

const Header = () => {
  const { openModal } = useModal();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const headerThemeClass = isHomePage ? styles.darkTheme : styles.lightTheme;
  return (
    <>
      <header className={`${styles.headerContainer} ${headerThemeClass}`}>
        <div className={styles.headerWrapper}>
          <Navigation isLightTheme={!isHomePage} />
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
          </div>
        </div>
        {/* <Button onClick={() => openModal('logout')}>Log Out</Button> */}
      </header>
    </>
  );
};

export default Header;
