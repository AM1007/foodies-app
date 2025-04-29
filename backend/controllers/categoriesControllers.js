import { getAllCategories } from '../services/categoriesServices.js';

export const getCategories = async (req, res) => {
  const categories = await getAllCategories();
  res.status(200).json(categories);
};
