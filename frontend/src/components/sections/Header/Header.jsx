import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AuthBar from '../../AuthBar/AuthBar.jsx';
import UserBar from '../../UserBar/UserBar.jsx';
import BurgerBtn from '../../ui/BurgerBtn/BurgerBtn.jsx';
import Logo from '../../Logo/Logo.jsx';
import Navigation from '../../Navigation/Navigation.jsx';
import { fetchCurrentUser } from '../../../redux/users/userSlice.js';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const isHomePage = location.pathname === '/';

  const headerThemeClass = isHomePage ? styles.darkTheme : styles.lightTheme;

  const { isAuthenticated = false } = useSelector(state => state.auth || {});
  const user = useSelector(state => state.user.current);

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [isAuthenticated, user, dispatch]);

  return (
    <section className="container">
      <header className={`${styles.headerContainer}  ${headerThemeClass}`}>
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
    </section>
  );
};

export default Header;
