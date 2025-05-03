import Logo from '../../Logo/Logo';
import NetworkLinks from '../../NetworkLinks/NetworkLinks';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className="container">
      <div className={styles.wrapper}>
        <Logo />

        <NetworkLinks />
      </div>
      <p className={styles.copyright}>
        © {new Date().getFullYear()}, Foodies. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
