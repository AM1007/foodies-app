import styles from './Logo.module.css';
import logo from '/public/logo.svg';

const Logo = () => {
  return (
    <>
      <img src={logo} alt="Site logo" className={styles.logo} />
    </>
  );
};

export default Logo;
