import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import MobileMenu from '../MobileMenu/MobileMenu';
import styles from './Navigation.module.css';

const Navigation = ({
  isLightTheme,
  isAuthenticated,
  isMenuOpen,
  setIsMenuOpen,
  BurgerBtn,
  openModal,
}) => {
  const location = useLocation();
  const isHomeActive = location.pathname === '/';
  const isAddRecipeActive = location.pathname.includes('/recipe/add') || (location.pathname !== '/' && location.pathname !== '/user');
  
  const generateHomeClass = () =>
    clsx(
      styles.link,
      isLightTheme ? styles.lightLink : styles.darkLink,
      isHomeActive && (isLightTheme ? styles.lightActive : styles.darkActive),
    );
    
  const generateAddRecipeClass = () =>
    clsx(
      styles.link,
      isLightTheme ? styles.lightLink : styles.darkLink,
      isAddRecipeActive && (isLightTheme ? styles.lightActive : styles.darkActive),
    );

  const handleAddRecipeClick = e => {
    if (!isAuthenticated) {
      e.preventDefault();
      openModal('signin');
    }
  };
  return (
    <>
      <nav
        className={clsx(
          styles.nav,
          isLightTheme ? styles.lightNav : styles.darkNav,
        )}
      >
        <ul
          className={clsx(
            styles.navList,
            !isAuthenticated && styles.navListHidden,
          )}
        >
          <li className={styles.navItem}>
            <NavLink className={generateHomeClass} to="/">
              Home
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              className={generateAddRecipeClass}
              to="recipes/add"
              onClick={handleAddRecipeClick}
            >
              Add recipe
            </NavLink>
          </li>
        </ul>
        {isAuthenticated && (
          <MobileMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            BurgerBtn={BurgerBtn}
          />
        )}
      </nav>
    </>
  );
};

export default Navigation;
