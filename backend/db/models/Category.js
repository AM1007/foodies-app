import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Category = sequelize.define(
  'Category',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

Category.sync();

export default Category;
