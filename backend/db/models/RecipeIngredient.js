import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const RecipeIngredient = sequelize.define(
  'RecipeIngredient',
  {
    measure: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  },
);

export default RecipeIngredient;
