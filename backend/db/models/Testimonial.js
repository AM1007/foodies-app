import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Testimonial = sequelize.define(
  'Testimonial',
  {
    testimonial: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);

export default Testimonial;
