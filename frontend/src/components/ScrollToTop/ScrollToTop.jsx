import ScrollToTop from 'react-scroll-to-top';
import styles from './ScrollToTop.module.css';

const ScrollTopButton = () => {
  return <ScrollToTop smooth className={styles.scrollTop} />;
};

export default ScrollTopButton;
