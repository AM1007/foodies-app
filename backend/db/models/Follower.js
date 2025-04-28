import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Follower = sequelize.define(
  'Follower',
  {
    // Цей модель буде використовуватися як проміжна таблиця
    // для зв'язку "хто на кого підписаний"
  },
  {
    timestamps: true,
  },
);

export default Follower;
