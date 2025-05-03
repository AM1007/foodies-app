import React from 'react';
import styles from './Categories.module.css';
import MainTitle from '../../ui/MainTitle/MainTitle';
import Subtitle from '../../ui/SubTitle/SubTitle';

const Categories = () => {
  return (
    <section className={styles.container}>
      <div className={styles.categoriesSection}>
        <div className={styles.textWrapper}>
          <MainTitle>Categories</MainTitle>
          <Subtitle>
            Discover a limitless world of culinary possibilities and enjoy
            exquisite recipes that combine taste, style and the warm atmosphere
            of the kitchen.
          </Subtitle>
        </div>
      </div>
    </section>
  );
};

export default Categories;
