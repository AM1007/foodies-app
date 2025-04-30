import styles from './MainTitle.module.css';

const MainTitle = ({ children }) => (
  <div className={styles.titleContainer}>
    <h2 className={styles.title}>{children}</h2>
  </div>
);

export default MainTitle;
