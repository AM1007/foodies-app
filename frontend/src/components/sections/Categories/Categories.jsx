import { useState } from 'react';
import MainTitle from '../../ui/MainTitle/MainTitle';
import Subtitle from '../../ui/SubTitle/SubTitle';
import CategoryList from '../../CategoryList/CategoryList';
import RecipeList from '../../RecipeList/RecipeList';
import styles from './Categories.module.css';
import icons from '../../../icons/sprite.svg';

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showRecipeList, setShowRecipeList] = useState(false);

  const handleCategoryClick = (categoryId, categoryName) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategory(categoryName);
    setShowRecipeList(true);
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
              <svg className={styles.backIcon} aria-hidden="true">
                <use href={`${icons}#icon-back`} />
              </svg>
              <span className={styles.backButtonText}>Back</span>
            </button>
            <MainTitle
              className={styles.title}
              text={selectedCategory || 'Recipes'}
            />
            <Subtitle
              className={styles.subTitle}
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
