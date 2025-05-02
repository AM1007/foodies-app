import { useState } from 'react';
import styles from './AddRecipeForm.module.css';
// import axios from 'axios';

import DeleteBtn from '../ui/DeleteBtn/DeleteBtn';
// import SelectCategory from '../SelectCategory/SelectCategory';
import TimeController from '../ui/TimeController/TimeController';

const AddRecipeForm = () => {
  // const [categories, setCategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState('');
  const [text, setText] = useState('');
  const [time, setTime] = useState(10);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.get(
  //         'https://foodies-app-pke3.onrender.com/api/categories',
  //       );
  //       setCategories(response.data);
  //     } catch (error) {
  //       console.error('Failed to fetch categories:', error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  return (
    <>
      {/* Фото */}
      <div className={styles.photoUpload}>
        <div className={styles.uploadPlaceholder}>
          <div className={styles.cameraIcon}>
            {/* Фото-іконка */}
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none"></svg>
          </div>
          <p className={styles.uploadText}>Upload a photo</p>
          <input type="file" className={styles.fileInput} accept="image/*" />
        </div>
      </div>

      {/* Назва рецепту */}
      <div className={styles.formGroup}>
        <label className={`${styles.nameLabel} ${styles.label}`}>
          The name of the recipe
        </label>
        <div className={styles.inputWrapper}>
          <textarea
            className={styles.textarea}
            placeholder="Enter a description of the dish"
            maxLength={200}
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <span className={styles.charCount}>{text.length}/200</span>
        </div>
      </div>

      {/* Категорія, Час приготування, Інгредієнти, Кількість */}
      <div className={styles.formWrapper}>
        {/* Категорія */}
        
        <div>
          <label className={styles.label}>Category</label>
          {/* <SelectCategory
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          /> */}
        </div>
       

        {/* Час приготування */}
        <div>
          <label className={styles.label}>Cooking time</label>
          <TimeController value={time} onChange={setTime} />
        </div>

        {/* Інгредієнти */}
        <div>
          <label className={styles.label}>Ingredients</label>
          <select className={styles.select}>
            <option value="" >
              Add the ingredient
            </option>
          </select>
        </div>

        {/* Кількість */}
        <div>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter quantity"
          />
        </div>
      </div>

      {/* Кнопка додавання */}
      <button className={styles.addIngredientButton}>
        ADD INGREDIENT <span className={styles.plusIcon}>+</span>
      </button>

      {/* Рецепт */}
      <div className={styles.formGroup}>
        <label className={styles.label}>RECIPE PREPARATION</label>
        <div className={styles.inputWrapper}>
          <textarea
            className={styles.textarea}
            placeholder="Enter recipe"
          ></textarea>
          <span className={styles.charCount}>0/200</span>
        </div>
      </div>

      {/* Кнопки */}
      <div className={styles.actionsGroup}>
        <DeleteBtn />
        <button className={styles.resetButton}>
          <svg width="48" height="48" fill="none"></svg>
        </button>
        <button className={styles.publishButton}>PUBLISH</button>
      </div>
    </>
  );
};

export default AddRecipeForm;
