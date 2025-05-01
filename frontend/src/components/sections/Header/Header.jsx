import { useLocation } from 'react-router-dom';
import Logo from '../../Logo/Logo.jsx';
import Navigation from '../../Navigation/Navigation.jsx';
import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const headerThemeClass = isHomePage ? styles.darkTheme : styles.lightTheme;
  return (
    <>
      <header className={`${styles.headerContainer} ${headerThemeClass}`}>
        <div className={styles.headerWrapper}>
          <Logo className={isHomePage ? styles.logoDark : styles.logoLight} />
          <Navigation isLightTheme={!isHomePage} />
          {/* <div className={styles.buttons}>
            <button className={`${styles.button} ${styles.signIn}`}>
              SIGN IN
            </button>
            <button className={`${styles.button} ${styles.signUp}`}>
              SIGN UP
            </button>
          </div> */}
        </div>
      </header>
    </>
  );
};

export default Header;
