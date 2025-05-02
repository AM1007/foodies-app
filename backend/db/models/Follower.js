import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Follower = sequelize.define(
  'Follower',
  {
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    followingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },

  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['followerId', 'followingId'],
      },
    ],
  },
);

export default Follower;
