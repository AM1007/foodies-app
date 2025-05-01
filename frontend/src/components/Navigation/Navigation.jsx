import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import clsx from 'clsx';
import BurgerBtn from '../ui/BurgerBtn/BurgerBtn';
import MobileMenu from '../MobileMenu/MobileMenu';
import styles from './Navigation.module.css';

const Navigation = ({ isLightTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const generateActiveClass = ({ isActive }) =>
    clsx(
      styles.link,
      isLightTheme ? styles.lightLink : styles.darkLink,
      isActive && (isLightTheme ? styles.lightActive : styles.darkActive),
    );
  return (
    <>
      <nav
        className={clsx(
          styles.nav,
          isLightTheme ? styles.lightNav : styles.darkNav,
        )}
      >
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink className={generateActiveClass} to="/">
              Home
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink className={generateActiveClass} to="recipe/add">
              Add recipe
            </NavLink>
          </li>
        </ul>
        <BurgerBtn
          onClick={() => setIsMenuOpen(true)}
          isLightTheme={isLightTheme}
        />
        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </nav>
    </>
  );
};

export default Navigation;
