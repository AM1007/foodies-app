import { getAllIngredients } from '../services/ingredientsServices.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const getIngredients = async (req, res) => {
  const ingredients = await getAllIngredients();
  res.status(HTTP_STATUS.OK).json(ingredients);
};
