import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PathInfo.module.css';

const PathInfo = ({ current }) => (
  <div className={styles.wrapper}>
    <Link to="/" className={styles.link}>
      Home
    </Link>
    <span className={styles.slash}>/</span>
    <span className={styles.wrap}>{current}</span>
  </div>
);

export default PathInfo;
