import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PathInfo.module.css';

const PathInfo = ({ current }) => (
  <div className={`${styles.wrapper} container`}>
    <Link to="/" className={styles.link}>HOME</Link> / <span>{current}</span>
  </div>
);

export default PathInfo;
