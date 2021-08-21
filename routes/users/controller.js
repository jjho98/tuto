import { user } from '../../models';

export const readByEmail = async (email) => {
  return await user.findOne({ where: { email } });
};

export const readById = async (id) => {
  return await user.findByPk(id);
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

export const getMyInfo = async (req, res, next) => {
  try {
    const me = await user.findByPk(res.locals.user.id);
    // 비밀번호는 삭제 후 전달
    delete me.password;
    res.status(200).json(me);
  } catch (err) {
    next(err);
  }
};
