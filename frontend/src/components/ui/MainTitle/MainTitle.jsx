import React from 'react';
import styles from './MainTitle.module.css';

const MainTitle = ({ text }) => {
  return <h1 className={styles.title}>{text}</h1>;
};

export default MainTitle;
