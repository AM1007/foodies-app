import { useState } from 'react';
import styles from './IngredientSelector.module.css';
import DropdownSelector from '../ui/DropdownSelector/DropdownSelector';
import Button from '../Button/Button';
import icons from '../../icons/sprite.svg';

const IngredientSelector = ({ 
  ingredients, 
  onAddIngredient ,
  error,
}) => {
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');

  const handleAddIngredient = () => {
    if (selectedIngredient && ingredientQuantity) {
      const success = onAddIngredient(selectedIngredient, ingredientQuantity);
      if (success) {
        setSelectedIngredient('');
        setIngredientQuantity('');
      }
    }
  };

  return (
    <div>
      <div className={styles.ingredientsContainer}>
        <DropdownSelector
          label="Ingredients"
          options={ingredients}
          value={selectedIngredient}
          onChange={setSelectedIngredient}
          placeholder="Add the ingredient"
        />

        <div>
          <input
            type="text"
            className={styles.quantityInput}
            placeholder="Enter quantity"
            value={ingredientQuantity}
            onChange={e => setIngredientQuantity(e.target.value)}
          />
        </div>
      </div>
      
      <Button
        type="button"
        disabled={!selectedIngredient || !ingredientQuantity}
        className={styles.addIngredientButton}
        onClick={handleAddIngredient}
      >
        Add ingredient
        <svg width={20} height={20} fill='none'><use href={`${icons}#plus`}/></svg>
      </Button>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default IngredientSelector;