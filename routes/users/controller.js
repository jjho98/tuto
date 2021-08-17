import { user } from '../../models';

export const readByEmail = async (email) => {
  return await user.findOne({ where: { email } });
};

export const create = async (userData) => {
  return await user.create(userData);
};

export const verifyEmail = async (email) => {
  const count = await user.count({
    where: {
      email,
    },
  });
  return !!count;
};

export const verifyNickname = async (nickname) => {
  const count = await user.count({
    where: {
      nickname,
    },
  });
  return !!count;
};
