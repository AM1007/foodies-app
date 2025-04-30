// import { useState } from 'react';
// import styles from './CategoryList.module.css';
// import { fetchRecipesByCategory } from '../../api/recipesApi'; // припустимо, такий API
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ArrowIcon from '../Icons/ArrowIcon'; // ваша іконка-стрілка

// const CategoryList = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [showCategories, setShowCategories] = useState(true);

//   const categories = [
//     { id: 1, name: 'Desserts', image: '/images/dessert.jpg' },
//     { id: 2, name: 'Soups', image: '/images/soup.jpg' },
//     // Додайте інші категорії
//   ];

//   const handleCategoryClick = async categoryId => {
//     try {
//       const data = await fetchRecipesByCategory(categoryId);
//       if (data && data.length > 0) {
//         setRecipes(data);
//         setShowCategories(false);
//       } else {
//         toast.info('У цій категорії поки немає рецептів.');
//       }
//     } catch (error) {
//       toast.error('Не вдалося завантажити рецепти. Спробуйте пізніше.');
//     }
//   };

//   if (!showCategories) {
//     return (
//       <div>
//         <h2>Рецепти</h2>
//         {/* Приклад компонента Recipes */}
//         {/* <Recipes recipes={recipes} /> */}
//       </div>
//     );
//   }

//   return (
//     <ul className={styles.list}>
//       {categories.map(category => (
//         <li key={category.id} className={styles.card}>
//           <img
//             src={category.image}
//             alt={category.name}
//             className={styles.image}
//           />
//           <h3 className={styles.name}>{category.name}</h3>
//           <button
//             className={styles.button}
//             onClick={() => handleCategoryClick(category.id)}
//             aria-label={`View ${category.name} recipes`}
//           >
//             <ArrowIcon />
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default CategoryList;
