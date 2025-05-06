import { useState } from 'react';
import styles from './IngredientSelector.module.css';
import DropdownSelector from '../ui/DropdownSelector/DropdownSelector';
import Button from '../Button/Button';

const IngredientSelector = ({ 
  ingredients, 
  onAddIngredient 
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
        Add ingredient<span className={styles.plusIcon}>+</span>
      </Button>
    </div>
  );
};

export default IngredientSelector;