import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Ingredient = sequelize.define(
  'Ingredient',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  },
);

export default Ingredient;
