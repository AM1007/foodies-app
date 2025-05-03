import { useEffect, useState } from 'react';
import styles from './AddRecipeForm.module.css';
import DeleteBtn from '../ui/DeleteBtn/DeleteBtn';
import DropdownSelector from '../ui/DropdownSelector/DropdownSelector';
import TimeController from '../ui/TimeController/TimeController';
import RecipeIngredients from '../RecipeIngredients/RecipeIngredients';

const anyCategories = [
  { id: 1, name: 'Breakfast' },
  { id: 2, name: 'Lunch' },
  { id: 3, name: 'Dinner' },
];

const anyIngredients = [
  { id: 1, name: 'Flour', image: '/ingredients/flour.png' },
  { id: 2, name: 'Sugar', image: '/ingredients/sugar.png' },
  { id: 3, name: 'Salt', image: '/ingredients/salt.png' },
  { id: 4, name: 'Eggs', image: '/ingredients/eggs.png' },
  { id: 5, name: 'Milk', image: '/ingredients/milk.png' },
  { id: 6, name: 'Butter', image: '/ingredients/butter.png' },
];

const AddRecipeForm = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [recipeInstructions, setRecipeInstructions] = useState('');
  const [time, setTime] = useState(10);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    setCategories(anyCategories);
    setIngredients(anyIngredients);
  }, []);

  const handlePhotoUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addIngredient = () => {
    if (selectedIngredient && ingredientQuantity) {
      const ingredient = ingredients.find(ing => ing.id === selectedIngredient);
      if (ingredient) {
        setRecipeIngredients([
          ...recipeIngredients,
          {
            id: Date.now(),
            ingredientId: selectedIngredient,
            name: ingredient.name,
            quantity: ingredientQuantity,
            image: ingredient.image,
          },
        ]);
        setSelectedIngredient('');
        setIngredientQuantity('');
      }
    }
  };

  const removeIngredient = id => {
    setRecipeIngredients(recipeIngredients.filter(ing => ing.id !== id));
  };

  const handleSubmit = () => {
    const recipeData = {
      title: recipeName,
      instructions: recipeInstructions,
      categoryId: selectedCategory,
      time: time,
      ingredients: recipeIngredients,
      photo: photo,
    };
    console.log('Publishing recipe:', recipeData);
    // Тут буде логіка для відправки даних на сервер
  };

  const resetForm = () => {
    setRecipeName('');
    setRecipeInstructions('');
    setSelectedCategory('');
    setTime(10);
    setRecipeIngredients([]);
    setPhoto(null);
  };

  return (
    <>
      {/* Фото */}
      <div className={styles.photoUpload}>
  {photo ? (
    <div >
      <div className={styles.uploadedPhoto}>
        <img src={photo} alt="Recipe" className={styles.recipeImage} />
            </div>
            
      <label className={styles.uploadAnotherBtn}>
        Upload another photo
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className={styles.hiddenFileInput}
        />
      </label>
    </div>
  ) : (
    <div className={styles.uploadPlaceholder}>
      <div className={styles.cameraIcon}></div>
      <p className={styles.uploadText}>Upload a photo</p>
      <input
        type="file"
        className={styles.fileInput}
        accept="image/*"
        onChange={handlePhotoUpload}
      />
    </div>
  )}
</div>


      {/* Назва рецепту */}
      <div className={styles.formGroup}>
        <label className={`${styles.nameLabel} ${styles.label}`}>
          The name of the recipe
        </label>
        <div className={styles.inputWrapper}>
          <textarea
            className={styles.textarea}
            placeholder="Enter a name of the dish"
            maxLength={200}
            value={recipeName}
            onChange={e => setRecipeName(e.target.value)}
          />
          <span className={styles.charCount}>{recipeName.length}/200</span>
        </div>
      </div>

      {/* Категорія, Час приготування, Інгредієнти, Кількість */}
      <div className={styles.formWrapper}>
        {/* Категорія */}
        <DropdownSelector
          label="Category"
          options={categories}
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="Select a category"
        />

        {/* Час приготування */}
        <div>
          <label className={styles.label}>Cooking time</label>
          <TimeController value={time} onChange={setTime} />
        </div>

        {/* Інгредієнти і кількість */}
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

      {/* Кнопка додавання */}
      <button
        className={styles.addIngredientButton}
        onClick={addIngredient}
        disabled={!selectedIngredient || !ingredientQuantity}
      >
        Add ingredient<span className={styles.plusIcon}>+</span>
      </button>

      {/* Додані інгредієнти */}
      {recipeIngredients.length > 0 && (
        <RecipeIngredients
          ingredients={recipeIngredients}
          onRemove={removeIngredient}
        />
      )}

      {/* Рецепт */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Recipe preparation</label>
        <div className={styles.inputWrapper}>
          <textarea
            className={styles.textarea}
            placeholder="Enter recipe"
            value={recipeInstructions}
            onChange={e => setRecipeInstructions(e.target.value)}
            maxLength={2000}
          ></textarea>
          <span className={styles.charCount}>
            {recipeInstructions.length}/2000
          </span>
        </div>
      </div>

      {/* Кнопки */}
      <div className={styles.actionsGroup}>
        <DeleteBtn onClick={resetForm} />
        <button className={styles.publishButton} onClick={handleSubmit}>
          PUBLISH
        </button>
      </div>
    </>
  );
};

export default AddRecipeForm;
