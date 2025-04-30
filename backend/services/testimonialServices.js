import models from '../db/associations.js';
const { Testimonial, User } = models;

export const getAllTestimonials = async () => {
  return await Testimonial.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['name', 'email'],
      },
    ],
  });
};
