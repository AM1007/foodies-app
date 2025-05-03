import styles from './MainTitle.module.css';

const MainTitle = ({ text }) => {
  return <h2 className={styles.title}>{text}</h2>;
};

export default MainTitle;
