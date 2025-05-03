import { Link } from 'react-router-dom';
import clsx from 'clsx';
import icons from '../../icons/sprite.svg';
import styles from './Logo.module.css';

const Logo = ({ className }) => {
  return (
    <Link to="/" className="flex items-center">
      <svg className={clsx(styles.logo, className)}>
        <use href={`${icons}#logo`} />
      </svg>
    </Link>
  );
};

export default Logo;
