import { getAllAreas } from '../services/areasServices.js';

export const getAreas = async (req, res) => {
  const areas = await getAllAreas();
  res.status(200).json(areas);
};
