import { STATUS_MESSAGES } from '../constants/httpStatus.js';

const HttpError = (status, message = STATUS_MESSAGES[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export default HttpError;
