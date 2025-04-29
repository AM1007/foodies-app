import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const RecipeIngredient = sequelize.define(
  'RecipeIngredient',
  {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    ingredientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    measure: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: 'RecipeIngredients',
  }
);

// RecipeIngredient.sync()
export default RecipeIngredient;
