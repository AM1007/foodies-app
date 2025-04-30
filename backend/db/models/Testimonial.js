import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Testimonial = sequelize.define(
  'Testimonial',
  {
    testimonial: {
      type: DataTypes.TEXT,
      allowNull: false,
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

export default Testimonial;
