import { getAllCategories } from '../services/categoriesServices.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const getCategories = async (req, res) => {
  const categories = await getAllCategories();
  res.status(HTTP_STATUS.OK).json(categories);
};
