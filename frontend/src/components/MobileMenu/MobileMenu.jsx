import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import styles from './MobileMenu.module.css';

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <button onClick={onClose} className={styles.closeBtn}>
        ×
      </button>
      <Logo className={styles.logo} style={{ fill: '#ffffff' }} />
      <nav className={styles.nav}>
        <NavLink to="/" onClick={onClose}>
          Home
        </NavLink>
        <NavLink to="/add" onClick={onClose}>
          Add recipe
        </NavLink>
      </nav>
    </div>
  );
};

export default MobileMenu;
