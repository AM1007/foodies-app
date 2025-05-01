import React from 'react';
import styles from './AddRecipeForm.module.css';

const AddRecipeForm = () => {
  const [text, setText] = React.useState('');

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
        <label className={`${styles.nameLabel} ${styles.label}`}>THE NAME OF THE RECIPE</label>
        <div className={styles.inputWrapper}>
          <textarea
            className={styles.textarea}
            placeholder="Enter a description of the dish"
            maxLength={200}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <span className={styles.charCount}>{text.length}/200</span>
        </div>
      </div>

      {/* Категорія */}
      <div className={styles.formGroup}>
        <label className={styles.label}>CATEGORY</label>
        <div className={styles.selectWrapper}>
          <select className={styles.select}>
            <option value="" disabled selected>Select a category</option>
          </select>
        </div>
      </div>

      {/* Час приготування */}
      <div className={styles.formGroup}>
        <label className={styles.label}>COOKING TIME</label>
        <div className={styles.timeController}>
          <button className={styles.timeButton}>−</button>
          <span className={styles.timeValue}>10 min</span>
          <button className={styles.timeButton}>+</button>
        </div>
      </div>

      {/* Інгредієнти */}
      <div className={styles.formGroup}>
        <label className={styles.label}>INGREDIENTS</label>
        <div className={styles.ingredientInputs}>
          <div className={styles.selectWrapper}>
            <select className={styles.select}>
              <option value="" disabled selected>Add the ingredient</option>
            </select>
          </div>
          <input type="text" className={styles.input} placeholder="Enter quantity" />
        </div>
        <button className={styles.addIngredientButton}>
          ADD INGREDIENT <span className={styles.plusIcon}>+</span>
        </button>
      </div>

      {/* Рецепт */}
      <div className={styles.formGroup}>
        <label className={styles.label}>RECIPE PREPARATION</label>
        <div className={styles.inputWrapper}>
          <textarea className={styles.textarea} placeholder="Enter recipe"></textarea>
          <span className={styles.charCount}>0/200</span>
        </div>
      </div>

      {/* Кнопки */}
      <div className={styles.actionsGroup}>
        <button className={styles.resetButton}>
          <svg width="48" height="48" fill="none"></svg>
        </button>
        <button className={styles.publishButton}>PUBLISH</button>
      </div>
    </>
  );
};

export default AddRecipeForm;
