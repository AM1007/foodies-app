import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
import { emailRegexp } from '../../constants/auth.js';

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: emailRegexp,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
  },
);

export default User;
