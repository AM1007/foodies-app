import React from 'react';
import styles from './Categories.module.css';
import MainTitle from '../../sharedTitle/MainTitle/MainTitle';
import Subtitle from '../../sharedTitle/SubTitle/Subtitle';

const Categories = () => {
  return (
    <section className={styles.container}>
      <div className={styles.categoriesSection}>
        <div className={styles.textWrapper}>
          <MainTitle>CATEGORIES</MainTitle>
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
