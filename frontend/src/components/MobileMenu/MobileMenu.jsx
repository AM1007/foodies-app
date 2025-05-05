import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import CloseBtn from '../ui/CloseBtn/CloseBtn';
import useScrollLock from '../../hooks/useScrollLock';
import HeroImages from '../../components/ui/HeroImages/HeroImages.jsx';
import styles from './MobileMenu.module.css';

const MobileMenu = ({ isOpen, onClose }) => {
  useScrollLock(isOpen);
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.wrapper}>
        <Logo className={styles.logoWhite} />
        <CloseBtn onClick={onClose} />
      </div>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <NavLink className={styles.link} to="/" onClick={onClose}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/add" onClick={onClose}>
              Add recipe
            </NavLink>
          </li>
        </ul>
      </nav>
      <HeroImages />
    </div>
  );
};

export default MobileMenu;
