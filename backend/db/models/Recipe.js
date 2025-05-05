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
      references: {
        model: 'Categories',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    areaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Areas',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
  {
    timestamps: true,
  },
);

// Recipe.sync({ alter: true });

export default Recipe;
