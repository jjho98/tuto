import { user } from '../../models';

export const readByEmail = async (email) => {
  return await user.findOne({ where: { email } });
};

export const create = async (userData) => {
  return await user.create(userData);
};
