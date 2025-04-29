import { getAllIngredients } from '../services/ingredientsServices.js';

export const getIngredients = async (req, res) => {
  const ingredients = await getAllIngredients();
  res.status(200).json(ingredients);
};
