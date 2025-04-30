import styles from './Subtitle.module.css';

const Subtitle = ({ children }) => (
  <div className={styles.subtitleContainer}>
    <p className={styles.subtitle}>{children}</p>
  </div>
);

export default Subtitle;
