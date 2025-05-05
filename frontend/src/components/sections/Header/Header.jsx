import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AuthBar from '../../AuthBar/AuthBar.jsx';
import UserBar from '../../UserBar/UserBar.jsx';
import BurgerBtn from '../../ui/BurgerBtn/BurgerBtn.jsx';
import Logo from '../../Logo/Logo.jsx';
import Navigation from '../../Navigation/Navigation.jsx';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const headerThemeClass = isHomePage ? styles.darkTheme : styles.lightTheme;

  const isAuthenticated = false; //для тесту

  return (
    <>
      <header
        className={`${styles.headerContainer}  ${headerThemeClass}`}
      >
        <div className={styles.headerWrapper}>
          <Logo className={isHomePage ? styles.logoDark : styles.logoLight} />
          <Navigation
            isLightTheme={!isHomePage}
            isAuthenticated={isAuthenticated}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            BurgerBtn={BurgerBtn}
          />
          {isAuthenticated ? (
            <div className={styles.userControls}>
              <UserBar />
              <BurgerBtn
                onClick={() => setIsMenuOpen(true)}
                isLightTheme={!isHomePage}
              />
            </div>
          ) : (
            <AuthBar />
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
