import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DropdownSelector from '../ui/DropdownSelector/DropdownSelector';
import styles from './RecipeFilters.module.css';

import { fetchRecipes } from '../../redux/recipes/recipesSlice';
import { fetchIngredients } from '../../redux/ingredients/ingredientsSlice';
import { fetchAreas } from '../../redux/areas/areasSlice';

const RecipeFilters = ({ categoryName }) => {
  const dispatch = useDispatch();
  
  const { items: ingredients } = useSelector(state => state.ingredients);
  const { items: areas } = useSelector(state => state.areas);
  
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  
  useEffect(() => {
    if (!ingredients || ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
    
    if (!areas || areas.length === 0) {
      dispatch(fetchAreas());
    }
  }, [dispatch, ingredients, areas]);

  const handleIngredientChange = (ingredientId) => {
    setSelectedIngredient(ingredientId);
    
    dispatch(fetchRecipes({
      page: 1,
      category: categoryName,
      ingredient: ingredientId,
      region: selectedArea
    }));
  };
  
  const handleAreaChange = (areaId) => {
    setSelectedArea(areaId);
    
    dispatch(fetchRecipes({
      page: 1,
      category: categoryName,
      ingredient: selectedIngredient,
      region: areaId
    }));
  };

  return (
    <div className='container'>
      <div className={styles.filters}>
          <DropdownSelector
            options={ingredients || []}
            value={selectedIngredient}
            onChange={handleIngredientChange}
            placeholder="Ingredients"
          />
        
          <DropdownSelector
            options={areas || []}
            value={selectedArea}
            onChange={handleAreaChange}
            placeholder="Area"
          />
      </div>
    </div>
  );
};

export default RecipeFilters;