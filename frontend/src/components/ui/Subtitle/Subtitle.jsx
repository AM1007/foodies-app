import React from 'react';
import styles from './Subtitle.module.css';

const Subtitle = ({ text }) => {
  return <p className={styles.subtitle}>{text}</p>;
};

export default Subtitle;
