import Category from '../db/models/Category.js';

export const getAllCategories = async () => {
  return await Category.findAll();
};
