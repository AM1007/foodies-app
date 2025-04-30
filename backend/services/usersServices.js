import User from '../db/models/User.js';

const findUser = async query => User.findOne({ where: query });

export default { findUser };
