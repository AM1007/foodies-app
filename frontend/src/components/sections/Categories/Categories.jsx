import { useState } from 'react';
import MainTitle from '../../ui/MainTitle/MainTitle';
import Subtitle from '../../ui/SubTitle/SubTitle';
import CategoryList from '../../CategoryList/CategoryList';
import RecipeList from '../../RecipeList/RecipeList';
import styles from './Categories.module.css';

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showRecipeList, setShowRecipeList] = useState(false);

  const handleCategoryClick = async (categoryId, categoryName) => {
    try {
      setSelectedCategoryId(categoryId);
      setSelectedCategory(categoryName);

      setShowRecipeList(true);
    } catch (error) {
      console.log(`Error: ${error.message || 'Something went wrong'}`);
    }
  };

  const handleBackToCategories = () => {
    setShowRecipeList(false);
  };

  return (
    <div className={styles.categoriesContainer}>
      <div className={styles.categoriesWrapper}>
        {!showRecipeList ? (
          <>
            <MainTitle className={styles.title} text="Categories" />
            <Subtitle
              className={styles.subTitle}
              text="Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style, and the warm atmosphere of the kitchen."
            />
            <CategoryList onCategoryClick={handleCategoryClick} />
          </>
        ) : (
          <>
            <button
              onClick={handleBackToCategories}
              className={styles.backButton}
            >
              Back to Categories
            </button>
            <MainTitle
              className={styles.title}
              text={selectedCategory || 'Recipes'}
            />
            <Subtitle
              className={styles.title}
              text="Go on a taste journey, where every sip is a sophisticated creative chord, and every dessert is an expression of the most refined gastronomic desires."
            />
            <RecipeList
              category={selectedCategory || 'Recipes'}
              categoryId={selectedCategoryId}
            />
          </>
        )}
      </div>
    </div>
  );
}
