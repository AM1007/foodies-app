import models from '../db/associations.js';
import HttpError from '../helpers/HttpError.js';

const { User } = models;

const findUser = async query => await User.findOne({ where: query });

const updateUserAvatar = async (email, avatar) => {
  if (avatar === undefined) {
    throw HttpError(400, 'Please provide an avatar');
  }
  const user = await findUser({ email });
  if (!user) {
    throw HttpError(404, 'User not found');
  }
  await user.update({ avatar });
};

export default { findUser, updateUserAvatar };
