import models from '../db/associations.js';
const { Area } = models;

export const getAllAreas = async () => {
  return await Area.findAll();
};
