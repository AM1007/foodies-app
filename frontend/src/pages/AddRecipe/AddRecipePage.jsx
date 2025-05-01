// src/pages/AddRecipePage/AddRecipePage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

import PathInfo from '../../components/ui/PathInfo/PathInfo';
import MainTitle from '../../components/MainTitle/MainTitle';
import Subtitle from '../../components/Subtitle/Subtitle';
import AddRecipeForm from '../../components/AddRecipeForm/AddRecipeForm';

const AddRecipePage = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <PathInfo current="ADD RECIPE" onHomeClick={handleHome} />
      <MainTitle text="Add recipe" />
      <Subtitle text="Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us." />
      <AddRecipeForm />
    </div>
  );
};

export default AddRecipePage;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// import styles from './AddRecipe.module.css';

// const AddRecipe = () => {

//   {/* навігація на домашню сторінку */}
//   const navigate = useNavigate();

//   const handleHome = () => {
//     navigate('/');
//   };

//   const [text, setText] = React.useState('');
  
//   return (
//     <div className={`container`}>
//       {/* Хедер з заголовком */}
//       <div className={styles.pageIntro}>
//         <div className={styles.breadcrumbs}>
//           <span onClick={handleHome}>HOME</span> / <span className={styles.active} >ADD RECIPE</span>
//         </div>
//         <h1 className={styles.title}>ADD RECIPE</h1>
//         <p className={styles.subtitle}>
//           Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.
//         </p>
//       </div>

//       {/* Блок завантаження фото */}
//       <div className={styles.photoUpload}>
//         <div className={styles.uploadPlaceholder}>
//           <div className={styles.cameraIcon}>
//             {/* Тут має бути іконка фото*/}
//             <svg width="50" height="50" viewBox="0 0 50 50" fill="none" >
//             </svg>
//           </div>
//           <p className={styles.uploadText}>Upload a photo</p>
//           <input
//             type="file"
//             className={styles.fileInput}
//             accept="image/*"
//           />
//         </div>
//       </div>

//       {/* Назва рецепту */}
//       <div className={styles.formGroup}>
//         <label className={`${styles.nameLabel} ${styles.label}` }>THE NAME OF THE RECIPE</label>
//         <div className={styles.inputWrapper}>
//           <textarea
//   className={styles.textarea}
//   placeholder="Enter a description of the dish"
//   maxLength={200}
//   value={text}
//   onChange={(e) => setText(e.target.value)}
//           />
//           <span className={styles.charCount}>{text.length}/200</span>
//         </div>
//       </div>

//       {/* Категорія */}
//       <div className={styles.formGroup}>
//         <label className={styles.label}>CATEGORY</label>
//         <div className={styles.selectWrapper}>
//           <select className={styles.select}>
//             <option value="" disabled selected>Select a category</option>
//             {/* Drop down_category */}
//           </select>
//         </div>
//       </div>

//       {/* Час приготування */}
//       <div className={styles.formGroup}>
//         <label className={styles.label}>COOKING TIME</label>
//         <div className={styles.timeController}>
//           <button className={styles.timeButton}>−</button>
//           <span className={styles.timeValue}>10 min</span>
//           {/* Drop down_time */}
//           <button className={styles.timeButton}>+</button>
//         </div>
//       </div>

//       {/* Інгредієнти */}
//       <div className={styles.formGroup}>
//         <label className={styles.label}>INGREDIENTS</label>
//         <div className={styles.ingredientInputs}>
//           <div className={styles.selectWrapper}>
//             <select className={styles.select}>
//               <option value="" disabled selected>Add the ingredient</option>
//               {/* Drop down_category */}
//             </select>
//           </div>
//           <input
//             type="text"
//             className={styles.input}
//             placeholder="Enter quantity"
//           />
//         </div>
//         <button className={styles.addIngredientButton}>
//           ADD INGREDIENT <span className={styles.plusIcon}>+</span>
//         </button>
//       </div>

//       {/* Опис приготування */}
//       <div className={styles.formGroup}>
//         <label className={styles.label}>RECIPE PREPARATION</label>
//         <div className={styles.inputWrapper}>
//           <textarea
//             className={styles.textarea}
//             placeholder="Enter recipe"
//           ></textarea>
//           <span className={styles.charCount}>0/200</span>
//         </div>
//       </div>

//       {/* Кнопки дій  */}
//       <div className={styles.actionsGroup}>
//         <button className={styles.resetButton}>
//           <svg width="48" height="48" fill="none">
//             {/* Тут має бути іконка */}
//           </svg>
//         </button>
//         <button className={styles.publishButton}>
//           PUBLISH
//         </button>
//       </div>

//     </div>
//   );
// };

// export default AddRecipe;