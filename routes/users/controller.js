import User from '../../models/user';

export const read = async (email) => {
  return await User.findOne({ email });
};

export const create = async (user) => {
  return await User.create(user);
};
