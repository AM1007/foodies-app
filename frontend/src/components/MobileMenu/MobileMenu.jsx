import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../Logo/Logo';
import CloseBtn from '../ui/CloseBtn/CloseBtn';
import useScrollLock from '../../hooks/useScrollLock';
import styles from './MobileMenu.module.css';

const MobileMenu = ({ isOpen, onClose }) => {
  useScrollLock(isOpen);

  return (
    <motion.div
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
            <NavLink className={styles.link} to="/add" onClick={onClose}>
              Add recipe
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.imageWrapper}>
        <img
          src="/image/hero/image_hero_dish2_1x.png"
          srcSet="/image/hero/image_hero_dish2_1x.png 1x, /image/hero/image_hero_dish2_2x.png 2x"
          alt="Beef Wellington"
          width="77"
          height="70"
        />
        <img
          src="/image/hero/image_hero_dish1_1x.png"
          srcSet="/image/hero/image_hero_dish1_1x.png 1x, /image/hero/image_hero_dish1_2x.png 2x"
          alt="Dish"
          width="190"
          height="172"
        />
      </div>
    </motion.div>
  );
};

export default MobileMenu;
