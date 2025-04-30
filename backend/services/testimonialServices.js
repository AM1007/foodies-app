import Testimonial from '../db/models/Testimonial.js';

export const getAllTestimonials = async () => {
  return await Testimonial.findAll();
};
