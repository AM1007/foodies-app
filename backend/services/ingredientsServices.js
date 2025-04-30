import models from '../db/associations.js';
const { Ingredient } = models;

export const getAllIngredients = async () => {
  return await Ingredient.findAll();
};
