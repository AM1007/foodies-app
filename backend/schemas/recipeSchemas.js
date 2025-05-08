import Joi from 'joi';

const ingredientSchema = Joi.object({
  ingredientId: Joi.number().required().messages({
    'any.required': 'Ingredient ID is required',
  }),
  measure: Joi.string().allow('', null),
});

const createRecipeSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'Title is required',
    'string.empty': 'Title cannot be empty',
  }),
  description: Joi.string().allow('', null),
  instructions: Joi.string().required().messages({
    'any.required': 'Instructions are required',
    'string.empty': 'Instructions cannot be empty',
  }),
  time: Joi.number().min(0).default(0),
  categoryId: Joi.number().required().messages({
    'any.required': 'Category ID is required',
  }),
  areaId: Joi.number().required().messages({
    'any.required': 'Area ID is required',
  }),
  ingredients: Joi.array().items(ingredientSchema).min(1).required().messages({
    'any.required': 'At least one ingredient is required',
    'array.min': 'At least one ingredient is required',
  }),
  thumb: Joi.string().allow('', null),
  preview: Joi.string().allow('', null),
});

const updateRecipeSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow('', null),
  instructions: Joi.string(),
  time: Joi.number().min(0),
  categoryId: Joi.number(),
  areaId: Joi.number(),
  ingredients: Joi.array().items(ingredientSchema).min(1),
  thumb: Joi.string().allow('', null),
  preview: Joi.string().allow('', null),
}).min(1);

const recipeQuerySchema = Joi.object({
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(100).default(30),
  title: Joi.string(),
  category: Joi.number(),
  area: Joi.number(),
  ingredient: Joi.number(),
  time: Joi.number(),
  sort: Joi.string().valid(
    'title',
    'time',
    'createdAt',
    '-title',
    '-time',
    '-createdAt',
  ),
});

export default {
  createRecipeSchema,
  updateRecipeSchema,
  recipeQuerySchema,
};
