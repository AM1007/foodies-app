import { useEffect, useState, useCallback } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

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
import { fetchAreas } from '../../redux/areas/areasSlice';
import styles from './AddRecipeForm.module.css';

const DRAFT_STORAGE_KEY = 'recipe_draft';
const RESTORE_ASKED_KEY = 'draft_restore_asked';

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
  categoryId: yup.string().required('Category and cooking time is required'),
  time: yup.number().required('Cooking time is required'),
  instructions: yup
    .string()
    .required('Recipe instructions are required')
    .max(2000, 'Instructions cannot exceed 2000 characters'),
  photo: yup.mixed().required('Recipe photo is required'),
  ingredients: yup
    .boolean()
    .oneOf([true], 'At least one ingredient is required'),
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
  const { items: areas } = useSelector(state => state.areas);

  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      categoryId: '',
      time: 10,
      instructions: '',
      photo: null,
      ingredients: false,
    },
    mode: 'onSubmit',
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    setValue,
    reset,
    watch,
    setError,
    clearErrors,
    getValues,
  } = methods;

  const title = watch('title');
  const description = watch('description');
  const categoryId = watch('categoryId');
  const time = watch('time');
  const instructions = watch('instructions');

  const saveDraft = useCallback(() => {
    if (
      !title &&
      !description &&
      !instructions &&
      recipeIngredients.length === 0
    ) {
      return;
    }

    try {
      const formValues = getValues();

      const draftData = {
        title: formValues.title,
        description: formValues.description,
        categoryId: formValues.categoryId,
        time: formValues.time,
        instructions: formValues.instructions,
        recipeIngredients: recipeIngredients,
        savedAt: new Date().toISOString(),
      };

      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftData));
    } catch (e) {
      console.error('Failed to save draft:', e);
    }
  }, [title, description, instructions, recipeIngredients, getValues]);

  const restoreDraft = useCallback(() => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (savedDraft) {
        const draftData = JSON.parse(savedDraft);

        setValue('title', draftData.title || '');
        setValue('description', draftData.description || '');
        setValue('categoryId', draftData.categoryId || '');
        setValue('time', draftData.time || 10);
        setValue('instructions', draftData.instructions || '');

        if (
          draftData.recipeIngredients &&
          draftData.recipeIngredients.length > 0
        ) {
          setRecipeIngredients(draftData.recipeIngredients);
          setValue('ingredients', true);
        }

        toast.success('Recipe draft restored successfully');
      }
    } catch (e) {
      console.error('Failed to restore draft:', e);
      toast.error('Failed to restore draft');
    }
  }, [setValue]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAreas());
    dispatch(fetchIngredients());

    const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
    const alreadyAskedInSession = sessionStorage.getItem(RESTORE_ASKED_KEY);

    if (savedDraft && !alreadyAskedInSession) {
      try {
        JSON.parse(savedDraft);
        sessionStorage.setItem(RESTORE_ASKED_KEY, 'true');

        const confirmRestore = window.confirm(
          'We found a saved draft of your recipe. Would you like to restore it?',
        );

        if (confirmRestore) {
          restoreDraft();
        }
      } catch (e) {
        console.error('Failed to parse saved draft:', e);
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      }
    }
  }, [dispatch, restoreDraft]);

  useEffect(() => {
    if (recipeIngredients.length > 0) {
      clearErrors('ingredients');
      setValue('ingredients', true, { shouldValidate: false });
    } else {
      setValue('ingredients', false, { shouldValidate: false });
    }
  }, [recipeIngredients, clearErrors, setValue]);

  useEffect(() => {
    if (isDirty || recipeIngredients.length > 0) {
      saveDraft();
    }
  }, [
    title,
    description,
    categoryId,
    time,
    instructions,
    recipeIngredients,
    isDirty,
    saveDraft,
  ]);

  const handlePhotoChange = file => {
    setValue('photo', file);
    if (file) {
      clearErrors('photo');
    }
  };

  const handleAddIngredient = (ingredientId, quantity) => {
    if (ingredientId && quantity) {
      const ingredient = ingredients.find(ing => ing.id === ingredientId);
      if (ingredient) {
        const isAlreadyAdded = recipeIngredients.some(
          ing => ing.ingredientId === ingredientId,
        );

        if (isAlreadyAdded) {
          setError('ingredients', {
            type: 'manual',
            message: 'This ingredient is already added',
          });
          toast.error('This ingredient is already added');
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

        clearErrors('ingredients');
        setValue('ingredients', true, { shouldValidate: false });

        return true;
      }
    } else {
      setError('ingredients', {
        type: 'manual',
        message: 'Please select an ingredient and specify the quantity',
      });
      toast.error('Please select an ingredient and specify the quantity');
    }
    return false;
  };

  const handleRemoveIngredient = id => {
    const updatedIngredients = recipeIngredients.filter(ing => ing.id !== id);
    setRecipeIngredients(updatedIngredients);

    if (updatedIngredients.length === 0) {
      setValue('ingredients', false, { shouldValidate: false });
    }
  };

  const resetForm = () => {
    reset({
      title: '',
      description: '',
      categoryId: '',
      time: 10,
      instructions: '',
      photo: null,
      ingredients: false,
    });
    setRecipeIngredients([]);
    clearErrors();

    localStorage.removeItem(DRAFT_STORAGE_KEY);
    sessionStorage.removeItem(RESTORE_ASKED_KEY);

    toast.success('Form reset successfully');
  };

  const onSubmit = async data => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You are not logged in. Please log in to create a recipe.');
      return;
    }

    try {
      setIsSubmitting(true);

      console.log(
        'Photo file:',
        data.photo
          ? {
              name: data.photo.name,
              type: data.photo.type,
              size: data.photo.size,
            }
          : 'No file selected',
      );

      const loadingToast = toast.loading('Submitting your recipe...');

      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description || '');
      formData.append('categoryId', data.categoryId);
      formData.append('time', data.time);
      formData.append('instructions', data.instructions);
      formData.append('photo', data.photo);

      const areaId = areas && areas.length > 0 ? areas[0].id : 1;
      formData.append('areaId', areaId);

      recipeIngredients.forEach((ingredient, index) => {
        formData.append(
          `ingredients[${index}][ingredientId]`,
          ingredient.ingredientId,
        );
        formData.append(`ingredients[${index}][measure]`, ingredient.amount);
      });

      const resultAction = await dispatch(createRecipe(formData));

      toast.dismiss(loadingToast);

      if (createRecipe.fulfilled.match(resultAction)) {
        toast.success('Recipe published successfully!');

        localStorage.removeItem(DRAFT_STORAGE_KEY);
        sessionStorage.removeItem(RESTORE_ASKED_KEY);

        setTimeout(() => {
          navigate('/users/current');
        }, 1500);
      } else if (createRecipe.rejected.match(resultAction)) {
        const errorMessage = resultAction.payload || 'Failed to create recipe';
        toast.error(`Error: ${errorMessage}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message || 'Failed to create recipe'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (categoriesLoading || ingredientsLoading) return <Loader />;

  return (
    <FormProvider {...methods}>
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
                  <TimeController
                    value={field.value}
                    onChange={field.onChange}
                  />
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
    </FormProvider>
  );
};

export default AddRecipeForm;
