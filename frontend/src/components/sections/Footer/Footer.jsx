import CircularText from '../../CircularText/CircularText';
import Logo from '../../Logo/Logo';
import NetworkLinks from '../../NetworkLinks/NetworkLinks';
import styles from './Footer.module.css';

const Footer = ({ openModal }) => {
  return (
    <footer className={`container ${styles.footer}`}>
      <div className={styles.wrapper}>
        <Logo />
        <div onClick={() => openModal('team')}>
          <CircularText
            text="SPACE*RACCOONS*TEAM*"
            onHover="speedUp"
            spinDuration={20}
            className="custom-class"
          />
        </div>
        <NetworkLinks />
      </div>
      <p className={styles.copyright}>
        © {new Date().getFullYear()}, Foodies. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
