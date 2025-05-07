// Categories.jsx
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainTitle from '../../ui/MainTitle/MainTitle';
import Subtitle from '../../ui/SubTitle/SubTitle';
import CategoryList from '../../CategoryList/CategoryList';
import RecipeList from '../../RecipeList/RecipeList';
import styles from './Categories.module.css';

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showRecipeList, setShowRecipeList] = useState(false);

  const handleCategoryClick = async categoryName => {
    try {
      // Set the selected category name
      setSelectedCategory(categoryName);

      // Show recipe list and hide categories
      setShowRecipeList(true);
    } catch (error) {
      toast.error(`Error: ${error.message || 'Something went wrong'}`);
    }
  };

  const handleBackToCategories = () => {
    setShowRecipeList(false);
  };

  return (
    <div className="container">
      <div className={styles.categoriesWrapper}>
        {!showRecipeList ? (
          <>
            <MainTitle className={styles.title} text="Categories" />
            <Subtitle
              className={styles.title}
              text="Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style, and the warm atmosphere of the kitchen."
            />
            <CategoryList onCategoryClick={handleCategoryClick} />
          </>
        ) : (
          <>
            {/* <MainTitle
              className={styles.title}
              text={selectedCategory || 'Recipes'}
            /> */}
            {/* <Subtitle
              className={styles.title}
              text="Browse our delicious collection"
            /> */}
            <button
              onClick={handleBackToCategories}
              className={styles.backButton}
            >
              Back to Categories
            </button>
            <RecipeList category={selectedCategory} />
          </>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
