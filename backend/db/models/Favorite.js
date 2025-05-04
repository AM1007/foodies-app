import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Favorite = sequelize.define(
  'Favorite',
  {
    // Ця модель буде використовуватися як проміжна таблиця
    // і матиме лише зв'язки з User та Recipe
  },
  {
    timestamps: true,
  },
);

export default Favorite;
