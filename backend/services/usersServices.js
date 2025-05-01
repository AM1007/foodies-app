import models from '../db/associations.js';
import HttpError from '../helpers/HttpError.js';

const { User, Follower, Recipe } = models;

const getAllUsers = async () => {
  return await User.findAll({
    attributes: ['id', 'name', 'email'],
  });
};

const findUser = async query => {
  const user = await User.findOne({ where: query });
  if (!user) {
    throw HttpError(404, 'User not found');
  }
  return user;
};

const updateUserAvatar = async (userId, avatar) => {
  if (avatar === undefined) {
    throw HttpError(400, 'Please provide an avatar');
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
    throw HttpError(400, "You can't follow yourself");
  }
  await findUser({ id: followerId });
  await findUser({ id: followingId });
  const existingFollow = await verifyUsersConnection(followerId, followingId);

  if (existingFollow) {
    throw HttpError(400, 'User already being followed');
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
    throw HttpError(400, "You can't unfollow user that you are not following");
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
  return await user.getFollowing({
    attributes: ['id', 'name', 'email'],
    joinTableAttributes: [],
  });
};

const getUsersFollowingMe = async id => {
  const user = await findUser({ id });
  return await user.getFollowers({
    attributes: ['id', 'name', 'email'],
    joinTableAttributes: [],
  });
};

const getUserDetailedInfo = async (userId, { isSelf = false } = {}) => {
  const user = await findUser({ id: userId });

  const recipesCount = await user.countRecipes();
  const followersCount = await user.countFollowers();

  const profile = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    stats: {
      recipes: recipesCount,
      followers: followersCount,
    },
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
