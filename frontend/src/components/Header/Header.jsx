import Logo from '../Logo/Logo';
import styles from './Header.module.css';

const Header = () => {
  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.headerWrapper}>
          <Logo />
          <div className={styles.buttons}>
            <button className={`${styles.button} ${styles.signIn}`}>
              SIGN IN
            </button>
            <button className={`${styles.button} ${styles.signUp}`}>
              SIGN UP
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
