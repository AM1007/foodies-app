import { Link } from 'react-router-dom';
import icons from '../../icons/sprite.svg';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <svg className={styles.logo}>
        <use href={`${icons}#logo`} />
      </svg>
    </Link>
  );
};

export default Logo;
