import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import * as yup from 'yup';
import styles from './IngredientSelector.module.css';
import DropdownSelector from '../ui/DropdownSelector/DropdownSelector';
import Button from '../Button/Button';
import icons from '../../icons/sprite.svg';

const ingredientSchema = yup.object().shape({
  ingredientId: yup.string().required('Please select an ingredient'),
  quantity: yup.string().required('Please enter quantity').trim()
});

const IngredientSelector = ({ ingredients, onAddIngredient }) => {
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');
  const [ingredientError, setIngredientError] = useState('');
  const [quantityError, setQuantityError] = useState('');

  const { formState: { errors },  clearErrors } = useFormContext();

  const ingredientsError = errors.ingredients?.message;

  const validateFields = async () => {
    try {
      setIngredientError('');
      setQuantityError('');
      
      await ingredientSchema.validate({
        ingredientId: selectedIngredient,
        quantity: ingredientQuantity
      }, { abortEarly: false });
      
      clearErrors('ingredients');
      return true;
    } catch (err) {
      if (err.inner) {
        err.inner.forEach((e) => {
          if (e.path === 'ingredientId') {
            setIngredientError(e.message);
          } else if (e.path === 'quantity') {
            setQuantityError(e.message);
          }
        });
      }
      
      return false;
    }
  };

  const handleAddIngredient = async () => {
    const isValid = await validateFields();
    
    if (!isValid) {
      return;
    }
    const success = onAddIngredient(selectedIngredient, ingredientQuantity);
    if (success) {
      setSelectedIngredient('');
      setIngredientQuantity('');
      setIngredientError('');
      setQuantityError('');
      clearErrors('ingredients');
    }
  };

  const handleIngredientChange = (value) => {
    setSelectedIngredient(value);
    if (value) {
      setIngredientError('');
    }
  };
  
  const handleQuantityChange = (e) => {
    setIngredientQuantity(e.target.value);
    if (e.target.value.trim() !== '') {
      setQuantityError('');
    }
  };

  return (
    <div>
      <div className={styles.ingredientsContainer}>
        <div className={styles.ingredientField}>
          <DropdownSelector
            label="Ingredients"
            options={ingredients}
            value={selectedIngredient}
            onChange={handleIngredientChange}
            placeholder="Add the ingredient"
          />
          {ingredientError && (
            <p className={styles.errorMessage}>{ingredientError}</p>
          )}
        </div>

        <div className={styles.quantityField}>
          <input
            type="text"
            className={`${styles.quantityInput} ${quantityError ? styles.errorInput : ''}`}
            placeholder="Enter quantity"
            value={ingredientQuantity}
            onChange={handleQuantityChange}
          />
          {quantityError && (
            <p className={styles.errorMessage}>{quantityError}</p>
          )}
        </div>
      </div>

      <Button
        type="button"
        className={`${styles.addIngredientButton} ${!selectedIngredient || !ingredientQuantity ? styles.addIngredientButtonInactive : ''}`}
        onClick={handleAddIngredient}
      >
        Add ingredient
        <span className={styles.plusIcon}>
          <svg width={20} height={20} fill="none">
            <use href={`${icons}#plus`} />
          </svg>
        </span>
      </Button>
      
      {ingredientsError && !ingredientError && !quantityError && (
        <p className={styles.errorMessage}>{ingredientsError}</p>
      )}
    </div>
  );
};

export default IngredientSelector;