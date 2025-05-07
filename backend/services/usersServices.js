import models from '../db/associations.js';
import HttpError from '../helpers/HttpError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

const { User, Follower, Recipe } = models;

const getAllUsers = async () => {
  return await User.findAll({
    attributes: ['id', 'name', 'email'],
  });
};

const findUser = async query => {
  const user = await User.findOne({ where: query });
  if (!user) {
    throw HttpError(HTTP_STATUS.NOT_FOUND, 'User not found');
  }
  return user;
};

const updateUserAvatar = async (userId, avatar) => {
  if (avatar === undefined) {
    throw HttpError(HTTP_STATUS.BAD_REQUEST, 'Please provide an avatar');
  }
  const user = await findUser({ id: userId });
  await user.update({ avatar });
};

const verifyUsersConnection = async (followerId, followingId) => {
  return await Follower.findOne({
    where: {
      followerId,
      followingId,
    },
  });
};

const followUser = async (followerId, followingId) => {
  if (followerId === Number(followingId)) {
    throw HttpError(HTTP_STATUS.BAD_REQUEST, "You can't follow yourself");
  }
  await findUser({ id: followerId });
  await findUser({ id: followingId });
  const existingFollow = await verifyUsersConnection(followerId, followingId);

  if (existingFollow) {
    throw HttpError(HTTP_STATUS.BAD_REQUEST, 'User already being followed');
  }

  await Follower.create({
    followerId,
    followingId,
  });
};

const unfollowUser = async (followerId, followingId) => {
  await findUser({ id: followerId });
  await findUser({ id: followingId });

  const existingFollow = await verifyUsersConnection(followerId, followingId);

  if (!existingFollow) {
    throw HttpError(
      HTTP_STATUS.BAD_REQUEST,
      "You can't unfollow user that you are not following",
    );
  }

  await Follower.destroy({
    where: {
      followerId,
      followingId,
    },
  });
};

const getUsersIFollow = async id => {
  const user = await findUser({ id });

  const followingUsers = await user.getFollowing({
    attributes: ['id', 'name', 'email', 'avatar'],
    include: [
      { association: 'recipes', attributes: ['id', 'title', 'thumb'] },
      {
        association: 'followers',
        attributes: ['name', 'email', 'avatar'],
        through: { attributes: [] },
      },
    ],
    joinTableAttributes: [],
  });
  return followingUsers;
};

const getUsersFollowingMe = async id => {
  const user = await findUser({ id });

  const followers = await user.getFollowers({
    attributes: ['id', 'name', 'email', 'avatar'],
    include: [
      {
        association: 'recipes',
        attributes: ['id', 'title', 'thumb'],
      },
      {
        association: 'followers',
        attributes: ['name', 'email', 'avatar'],
        through: { attributes: [] },
      },
    ],
    joinTableAttributes: [],
  });

  return followers;
};

const getUserDetailedInfo = async (userId, { isSelf = false } = {}) => {
  const user = await findUser({ id: userId });

  const recipesCount = await user.countRecipes();
  const followersCount = await user.countFollowers();

  const recipes = await user.getRecipes({
    attributes: [
      'id',
      'title',
      'description',
      'instructions',
      'thumb',
      'createdAt',
    ],
    order: [['createdAt', 'DESC']],
  });

  const profile = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    stats: {
      recipes: recipesCount,
      followers: followersCount,
    },
    recipes,
  };

  if (isSelf) {
    const favoriteCount = await user.countFavorites();
    const followingCount = await user.countFollowing();

    profile.stats.favorites = favoriteCount;
    profile.stats.following = followingCount;
  }
  return profile;
};

export default {
  findUser,
  updateUserAvatar,
  followUser,
  unfollowUser,
  getUsersIFollow,
  getUsersFollowingMe,
  getAllUsers,
  getUserDetailedInfo,
};
