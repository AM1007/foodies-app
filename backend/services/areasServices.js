import Area from '../db/models/Area.js';

export const getAllAreas = async () => {
  return await Area.findAll();
};
