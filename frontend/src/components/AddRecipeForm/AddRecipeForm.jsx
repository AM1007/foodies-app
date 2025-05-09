import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
  time: yup.number().required('Cooking time is required'),
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
  const [ingredientsError, setIngredientsError] = useState(null);

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

  useEffect(() => {
    if (recipeIngredients.length > 0) {
      setIngredientsError(null);
    }
  }, [recipeIngredients]);

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
          console.warn('This ingredient is already added');
          return false;
        }

        const newIngredient = {
          id: Date.now(),
          ingredientId,
          name: ingredient.name,
          amount: quantity,
          img: ingredient.thumb || ingredient.img || '/placeholder.png',
        };

        setRecipeIngredients(prevIngredients => [
          ...prevIngredients,
          newIngredient,
        ]);

        setIngredientsError(null);

        return true;
      }
    } else {
      console.warn('Please select an ingredient and specify the quantity');
    }
    return false;
  };

  const handleRemoveIngredient = id => {
    setRecipeIngredients(prevIngredients =>
      prevIngredients.filter(ing => ing.id !== id),
    );
  };

  const resetForm = () => {
    reset({
      title: '',
      description: '',
      categoryId: '',
      time: 10,
      instructions: '',
      photo: null,
    });
    setRecipeIngredients([]);
    setIngredientsError(null);
  };

  const onSubmit = async data => {
    if (recipeIngredients.length === 0) {
      setIngredientsError('At least one ingredient is required');
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
        console.log('Recipe published successfully!');
        navigate('/user');
      } else if (createRecipe.rejected.match(resultAction)) {
        const errorMessage = resultAction.payload || 'Failed to create recipe';
        console.error(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error creating recipe:', error);
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

        <div className={styles.categoryTime}>
          {/* Category */}
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <div>
                <DropdownSelector
                  className={styles.selector}
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
              <div>
                <TimeController value={field.value} onChange={field.onChange} />
                {errors.time && (
                  <p className={styles.errorMessage}>{errors.time.message}</p>
                )}
              </div>
            )}
          />
        </div>

        {/* Ingredient Selector */}
        <IngredientSelector
          ingredients={ingredients}
          onAddIngredient={handleAddIngredient}
        />
        {ingredientsError && (
          <p className={styles.errorMessage}>{ingredientsError}</p>
        )}

        {/* Recipe Ingredients */}
        {recipeIngredients.length > 0 && (
          <RecipeIngredients
            ingredients={recipeIngredients}
            onRemove={handleRemoveIngredient}
            removable={true}
          />
        )}

        <div className={styles.instructionsWrap}>
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
        </div>

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
      </div>
    </form>
  );
};

export default AddRecipeForm;
