import { getAllAreas } from '../services/areasServices.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const getAreas = async (req, res) => {
  const areas = await getAllAreas();
  res.status(HTTP_STATUS.OK).json(areas);
};
