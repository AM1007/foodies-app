import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const headerThemeClass = isHomePage ? styles.darkTheme : styles.lightTheme;
  return (
    <>
      <header className={`${styles.headerContainer} ${headerThemeClass}`}>
        <div className={styles.headerWrapper}>
          <Navigation isLightTheme={!isHomePage} />
          <div className={styles.buttons}>
            <button className={`${styles.button} ${styles.signIn}`}>
              SIGN IN
            </button>
            <button className={`${styles.button} ${styles.signUp}`}>
              SIGN UP
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
