import Ingredient from '../db/models/Ingredient.js';

export const getAllIngredients = async () => {
  return await Ingredient.findAll();
};
