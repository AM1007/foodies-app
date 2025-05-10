import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import Logo from '../Logo/Logo';
import CloseBtn from '../ui/CloseBtn/CloseBtn';
import useScrollLock from '../../hooks/useScrollLock';
import HeroImages from '../../components/ui/HeroImages/HeroImages.jsx';
import styles from './MobileMenu.module.css';

const MobileMenu = ({ isOpen, onClose }) => {
  useScrollLock(isOpen);

  const MotionDiv = motion.div;

  return (
    <MotionDiv
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ duration: 0.4 }}
      className={styles.overlay}
    >
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
            <NavLink
              className={styles.link}
              to="/recipes/add"
              onClick={onClose}
            >
              Add recipe
            </NavLink>
          </li>
        </ul>
      </nav>
      <HeroImages />
    </MotionDiv>
  );
};

export default MobileMenu;
