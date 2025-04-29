import { Link } from 'react-router-dom';
import styles from './Logo.module.css';
import logo from '/public/logo.svg';
// import icons from '../../icons/sprite.svg';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img src={logo} alt="Site logo" className={styles.logo} />
      {/* <svg width="136" height="16">
          <use href={`${icons}#logo`} />
        </svg> */}
    </Link>
  );
};

export default Logo;
