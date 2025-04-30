import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import Logo from '../Logo/Logo';
import styles from './Navigation.module.css';

const Navigation = ({ isLightTheme }) => {
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
        <Logo />
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink className={generateActiveClass} to="/">
              Home
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink className={generateActiveClass} to="/add">
              Add recipe
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
