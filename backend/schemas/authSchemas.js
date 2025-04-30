import Joi from 'joi';
import { emailRegexp } from '../constants/auth.js';

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name cannot be empty',
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    'any.required': 'Email is required',
    'string.pattern.base': 'Email must be valid',
    'string.empty': 'Email cannot be empty',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Password is required',
    'string.min': 'Password must be at least {#limit} characters long',
    'string.empty': 'Password cannot be empty',
  }),
});

const signInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    'any.required': 'Email is required',
    'string.pattern.base': 'Email must be valid',
    'string.empty': 'Email cannot be empty',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Password is required',
    'string.min': 'Password must be at least {#limit} characters long',
    'string.empty': 'Password cannot be empty',
  }),
});

export default { registerSchema, signInSchema };
