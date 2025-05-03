import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Area = sequelize.define(
  'Area',
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

export default Area;
