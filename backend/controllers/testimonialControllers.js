import { getAllTestimonials } from '../services/testimonialServices.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const getTestimonials = async (req, res) => {
  const testimonials = await getAllTestimonials();
  res.status(HTTP_STATUS.OK).json(testimonials);
};
