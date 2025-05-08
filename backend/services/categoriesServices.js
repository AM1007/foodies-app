import models from '../db/associations.js';
const { Category } = models;

export const getAllCategories = async () => {
  return await Category.findAll({
    attributes: ['id', 'name', 'imageUrl'],
    order: [['id', 'ASC']],
  });
};
