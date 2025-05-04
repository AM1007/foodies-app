import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './AddRecipeForm.module.css';
import PhotoUploader from '../UploadPecipePhoto/UploadRecipePhoto.jsx';
import DeleteBtn from '../ui/DeleteBtn/DeleteBtn.jsx';
import DropdownSelector from '../ui/DropdownSelector/DropdownSelector.jsx';
import TimeController from '../ui/TimeController/TimeController.jsx';
import RecipeIngredients from '../RecipeIngredients/RecipeIngredients.jsx';
import axiosAPI from '../../api/api.js';

const schema = yup.object().shape({
  title: yup
    .string()
    .required('Recipe name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(200, 'Name cannot exceed 200 characters'),
  description: yup
    .string()
    .required('Description is required')
    .max(200, 'Description cannot exceed 200 characters'),
  categoryId: yup.string().required('Category is required'),
  time: yup
    .number()
    .required('Cooking time is required')
    .min(1, 'Minimum cooking time is 1 minute'),
  instructions: yup
    .string()
    .required('Recipe instructions are required')
    .max(2000, 'Instructions cannot exceed 2000 characters'),
  photo: yup.mixed().required('Recipe photo is required'),
});

const AddRecipeForm = () => {
  const navigate = useNavigate();

  // Локальний стан
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      categoryId: '',
      time: 10,
      instructions: '',
      photo: null,
    },
  });

  const title = watch('title');
  const description = watch('description');
  const instructions = watch('instructions');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosAPI.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories');
      }
    };

    const fetchIngredients = async () => {
      try {
        const response = await axiosAPI.get('/ingredients');
        setIngredients(response.data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
        toast.error('Failed to load ingredients');
      }
    };

    fetchCategories();
    fetchIngredients();
  }, []);

  const handlePhotoChange = file => {
    setValue('photo', file);
  };

  const addIngredient = () => {
    if (selectedIngredient && ingredientQuantity) {
      const ingredient = ingredients.find(ing => ing.id === selectedIngredient);
      if (ingredient) {
        const isAlreadyAdded = recipeIngredients.some(
          ing => ing.ingredientId === selectedIngredient,
        );

        if (isAlreadyAdded) {
          toast.warning('This ingredient is already added');
          return;
        }

        const newIngredient = {
          id: Date.now(),
          ingredientId: selectedIngredient,
          name: ingredient.name,
          amount: ingredientQuantity,
          image: ingredient.thumb || ingredient.image || '/placeholder.png',
        };

        setRecipeIngredients(prevIngredients => [
          ...prevIngredients,
          newIngredient,
        ]);
        setSelectedIngredient('');
        setIngredientQuantity('');
      }
    } else {
      toast.warning('Please select an ingredient and specify the quantity');
    }
  };

  const removeIngredient = id => {
    setRecipeIngredients(recipeIngredients.filter(ing => ing.id !== id));
  };

  const resetForm = () => {
    reset();
    setRecipeIngredients([]);
    setSelectedIngredient('');
    setIngredientQuantity('');
  };

  const onSubmit = async data => {
    if (recipeIngredients.length === 0) {
      toast.error('Please add at least one ingredient');
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description || '');
      formData.append('categoryId', data.categoryId);
      formData.append('time', data.time);
      formData.append('instructions', data.instructions);
      formData.append('photo', data.photo);

      recipeIngredients.forEach((ingredient, index) => {
        formData.append(`ingredients[${index}][id]`, ingredient.ingredientId);
        formData.append(`ingredients[${index}][quantity]`, ingredient.amount);
      });

      await axiosAPI.post('/recipes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Recipe published successfully!');
      navigate('/user');
    } catch (error) {
      console.error('Error creating recipe:', error);
      const errorMessage =
        error.response?.data?.message || 'Failed to create recipe';
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {/*  Фото */}
      <PhotoUploader
        onPhotoChange={handlePhotoChange}
        error={errors.photo?.message}
      />

      {/* Назва рецепту */}
      <div className={styles.formGroup}>
  <div className={`${styles.nameWrapper} ${errors.title ? styles.errorInput : ''}`}>
    <textarea
      className={styles.nameLabel}
      placeholder="The name of the recipe"
      maxLength={200}
      {...register('title')}
    />
    <span className={styles.charCountTitle}>{title?.length || 0}</span>
  </div>
  {errors.title && (
    <p className={styles.errorMessage}>{errors.title.message}</p>
  )}
</div>
      {/* Опис рецепту */}
      <div className={styles.formGroup}>
        <label className={`${styles.label}`}>Description</label>
        <div
          className={`${styles.inputWrapper} ${
            errors.description ? styles.errorInput : ''
          }`}
        >
          <textarea
            className={styles.textarea}
            placeholder="Enter a description"
            maxLength={200}
            {...register('description')}
          />
          <span className={styles.charCount}>
            {description?.length || 0}/200
          </span>
        </div>
        {errors.description && (
          <p className={styles.errorMessage}>{errors.description.message}</p>
        )}
      </div>

      {/* Категорія, Час приготування, Інгредієнти, Кількість */}
      <div className={styles.formWrapper}>
        {/* Категорія */}
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <div className={styles.selectContainer}>
              <DropdownSelector
                label="Category"
                options={categories}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select a category"
              />
              {errors.categoryId && (
                <p className={styles.errorMessage}>
                  {errors.categoryId.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Час приготування */}
        <Controller
          name="time"
          control={control}
          render={({ field }) => (
            <div className={styles.timeContainer}>
              <TimeController value={field.value} onChange={field.onChange} />
              {errors.time && (
                <p className={styles.errorMessage}>{errors.time.message}</p>
              )}
            </div>
          )}
        />

        {/* Інгредієнти і кількість */}
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
      </div>

      {/* Кнопка додавання інгредієнта */}
      <button
        type="button"
        className={styles.addIngredientButton}
        onClick={addIngredient}
        disabled={!selectedIngredient || !ingredientQuantity}
      >
        Add ingredient<span className={styles.plusIcon}>+</span>
      </button>

      {/* Відображення доданих інгредієнтів */}
      {recipeIngredients.length > 0 && (
        <RecipeIngredients
          ingredients={recipeIngredients}
          onRemove={removeIngredient}
        />
      )}

      {/* Інструкції приготування */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Recipe preparation</label>
        <div
          className={`${styles.inputWrapper} ${
            errors.instructions ? styles.errorInput : ''
          }`}
        >
          <textarea
            className={styles.textarea}
            placeholder="Enter recipe instructions"
            maxLength={2000}
            {...register('instructions')}
          ></textarea>
          <span className={styles.charCount}>
            {instructions?.length || 0}/2000
          </span>
        </div>
        {errors.instructions && (
          <p className={styles.errorMessage}>{errors.instructions.message}</p>
        )}
      </div>

      {/* Кнопки скидання форми та публікації */}
      <div className={styles.actionsGroup}>
        <DeleteBtn onClick={resetForm} />
        <button
          type="submit"
          className={styles.publishButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'PUBLISHING...' : 'PUBLISH'}
        </button>
      </div>

      {/* Компонент для нотифікацій */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </form>
  );
};

export default AddRecipeForm;
