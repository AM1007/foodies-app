import bcrypt from 'bcrypt';
import gravatar from 'gravatar';
import User from '../db/associations.js';
import HttpError from '../helpers/HttpError.js';
import { HTTP_STATUS } from '../constants/auth.js';

export const register = async userData => {
  const { email, password, name } = userData;

  // Перевіряємо чи існує користувач з таким email
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw HttpError(HTTP_STATUS.CONFLICT, 'Email already in use');
  }

  // Створюємо хеш пароля
  const hashedPassword = await bcrypt.hash(password, 10);

  // Отримуємо аватар з gravatar
  const avatarURL = gravatar.url(email, { s: '250', d: 'mp' }, true);

  // Створюємо нового користувача
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar: avatarURL,
  });

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    avatar: newUser.avatar,
  };
};
