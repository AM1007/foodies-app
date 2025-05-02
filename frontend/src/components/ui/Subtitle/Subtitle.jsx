import styles from './Subtitle.module.css';

const SubTitle = ({ text }) => {
  return <p className={styles.subtitle}>{text}</p>;
};

export default SubTitle;
