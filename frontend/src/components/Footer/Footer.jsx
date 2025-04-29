import Logo from '../Logo/Logo';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <Logo />
    </div>
  );
};

export default Footer;
