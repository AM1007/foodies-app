import { useState } from 'react';
import MainTitle from '../../ui/MainTitle/MainTitle';
import Subtitle from '../../ui/SubTitle/SubTitle';
import CategoryList from '../../CategoryList/CategoryList';
// import Recipes from '../../RecipeInfo/RecipeInfo';
import styles from './Categories.module.css';

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = async categoryName => {
    try {
      const response = await fetch(`/api/recipes?category=${categoryName}`);
      if (!response.ok) {
        throw new Error('Помилка при завантаженні рецептів');
      }
      const data = await response.json();
      setSelectedCategory({ name: categoryName, recipes: data });
    } catch (error) {
      alert(error.message || 'Сталася помилка. Спробуйте ще раз!');
    }
  };

  return (
    <div className="container">
      <div className={styles.categoriesWrapper}>
        {!selectedCategory ? (
          <>
            <MainTitle  className={styles.title} text="Categories" />
            <Subtitle className={styles.title} text="Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style, and the warm atmosphere of the kitchen." />
            <CategoryList onCategoryClick={handleCategoryClick} />
          </>
        ) : (
          <RecipeInfo
            data={selectedCategory.recipes}
            category={selectedCategory.name}
          />
        )}
      </div>
    </div>
  );
}
