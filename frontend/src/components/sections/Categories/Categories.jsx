import MainTitle from '../../sharedTitle/MainTitle/MainTitle';
import Subtitle from '../../sharedTitle/SubTitle/Subtitle';
// import CategoryList from './CategoryList';
import styles from './Categories.module.css';

const Categories = () => {
  return (
    <section className={styles.section}>
      <MainTitle>CATEGORIES</MainTitle>
      <Subtitle>
        Discover a limitless world of culinary possibilities and enjoy exquisite
        recipes that combine taste, style and the warm atmosphere of the
        kitchen.
      </Subtitle>
      {/* <CategoryList /> */}
    </section>
  );
};

export default Categories;
