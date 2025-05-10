import CircularText from '../../CircularText/CircularText';
import Logo from '../../Logo/Logo';
import NetworkLinks from '../../NetworkLinks/NetworkLinks';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={`container ${styles.footer}`}>
      <div className={styles.wrapper}>
        <Logo />
        <CircularText
          text="SPACE*RACCOONS*TEAM*"
          onHover="speedUp"
          spinDuration={20}
          className="custom-class"
        />

        <NetworkLinks />
      </div>
      <p className={styles.copyright}>
        © {new Date().getFullYear()}, Foodies. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
