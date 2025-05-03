import styles from './SubTitle.module.css';

const SubTitle = ({ text }) => {
  return <p className={styles.subtitle}>{text}</p>;
};

export default SubTitle;
