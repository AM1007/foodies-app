import { getAllTestimonials } from '../services/testimonialServices.js';

export const getTestimonials = async (req, res) => {
  const testimonials = await getAllTestimonials();
  res.status(200).json(testimonials);
};
