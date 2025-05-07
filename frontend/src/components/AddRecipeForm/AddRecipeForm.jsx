import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './AddRecipeForm.module.css';
import PhotoUploader from '../UploadPecipePhoto/UploadRecipePhoto';
import RecipeTitleInput from '../ui/RecipeTitleInput/RecipeTitleInput';
import DropdownSelector from '../ui/DropdownSelector/DropdownSelector';
import TimeController from '../ui/TimeController/TimeController';
import RecipeIngredients from '../RecipeIngredients/RecipeIngredients';
import TextAreaWithCount from '../TextAreaWithCount/TextAreaWithCount';
import IngredientSelector from '../IngredientSelector/IngredientSelector';
import Button from '../Button/Button';
import icons from '../../icons/sprite.svg';
import Loader from '../Loader/Loader';

import { createRecipe } from '../../redux/recipes/recipesSlice';
import { fetchCategories } from '../../redux/categories/categoriesSlice';
import { fetchIngredients } from '../../redux/ingredients/ingredientsSlice';

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
  const dispatch = useDispatch();

  const { items: categories, loading: categoriesLoading } = useSelector(
    state => state.categories,
  );
  const { items: ingredients, loading: ingredientsLoading } = useSelector(
    state => state.ingredients,
  );
  const { loading: recipesLoading } = useSelector(state => state.recipes);

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
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handlePhotoChange = file => {
    setValue('photo', file);
  };

  const handleAddIngredient = (ingredientId, quantity) => {
    if (ingredientId && quantity) {
      const ingredient = ingredients.find(ing => ing.id === ingredientId);
      if (ingredient) {
        const isAlreadyAdded = recipeIngredients.some(
          ing => ing.ingredientId === ingredientId,
        );

        if (isAlreadyAdded) {
          toast.warning('This ingredient is already added');
          return false;
        }

        const newIngredient = {
          id: Date.now(),
          ingredientId,
          name: ingredient.name,
          amount: quantity,
          image: ingredient.thumb || ingredient.image || '/placeholder.png',
        };

        setRecipeIngredients(prevIngredients => [
          ...prevIngredients,
          newIngredient,
        ]);
        return true;
      }
    } else {
      toast.warning('Please select an ingredient and specify the quantity');
    }
    return false;
  };

  const handleRemoveIngredient = id => {
    setRecipeIngredients(recipeIngredients.filter(ing => ing.id !== id));
  };

  const resetForm = () => {
    reset();
    setRecipeIngredients([]);
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

      const resultAction = await dispatch(createRecipe(formData));

      if (createRecipe.fulfilled.match(resultAction)) {
        toast.success('Recipe published successfully!');
        navigate('/user');
      } else if (createRecipe.rejected.match(resultAction)) {
        const errorMessage = resultAction.payload || 'Failed to create recipe';
        toast.error(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error creating recipe:', error);
      toast.error(`Error: ${error.message || 'Failed to create recipe'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (categoriesLoading || ingredientsLoading) return <Loader />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {/* Photo */}
      <PhotoUploader
        onPhotoChange={handlePhotoChange}
        error={errors.photo?.message}
      />
      <div className={styles.formWrapper}>
        {/* Recipe Title */}
        <RecipeTitleInput 
          register={register('title')} 
          value={title} 
          error={errors.title?.message}
        />

        {/* Description */}
        <TextAreaWithCount
          placeholder="Enter a description of the dish"
          maxLength={200}
          register={register}
          name="description"
          value={description}
          error={errors.description?.message}
        />

        {/* Category */}
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <div>
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

        {/* Time */}
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

        {/* Ingredient Selector */}
        <IngredientSelector
          ingredients={ingredients}
          onAddIngredient={handleAddIngredient}
        />

        {/* Recipe Ingredients */}
        {recipeIngredients.length > 0 && (
          <RecipeIngredients
            ingredients={recipeIngredients}
            onRemove={handleRemoveIngredient}
            removable={true}
          />
        )}

        {/* Recipe Instruction */}
        <TextAreaWithCount
          label="Recipe preparation"
          placeholder="Enter recipe"
          maxLength={2000}
          register={register}
          name="instructions"
          value={instructions}
          error={errors.instructions?.message}
        />

        {/* Form Actions */}
        <div className={styles.actionsGroup}>
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={resetForm}
          >
            <svg fill="none">
              <use href={`${icons}#trash`} />
            </svg>
          </button>

          <Button
            type="submit"
            disabled={isSubmitting || recipesLoading}
            className={styles.publishButton}
          >
            {isSubmitting || recipesLoading ? 'PUBLISHING...' : 'PUBLISH'}
          </Button>
        </div>

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
      </div>
    </form>
  );
};

export default AddRecipeForm;
