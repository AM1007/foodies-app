export const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const userNameRegexp = /^[a-zA-Z0-9_.\-, ]+$/;

import { HTTP_STATUS } from './httpStatus.js';

export default {
  emailRegexp,
  HTTP_STATUS,
};
