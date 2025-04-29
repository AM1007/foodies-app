import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Recipe = sequelize.define(
  'Recipe',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: 'Cook time in minutes',
    },
    thumb: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preview: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  areaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
    // Зовнішні ключі будуть додані після створення асоціацій
  },
  {
    timestamps: true,
  },
);

// Recipe.sync();
export default Recipe;
