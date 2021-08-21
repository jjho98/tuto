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

// 내 프로필 정보 받아오기
export const getMyInfo = async (req, res, next) => {
  try {
    const me = await user.findByPk(res.locals.user.id);
    // 비밀번호는 삭제 후 전달
    me.password = null;
    // 썸네일이 null이면 기본 이미지 전달
    if (!me.thumbnail) {
      me.thumbnail =
        'https://tuto-bucket.s3.ap-northeast-2.amazonaws.com/user-icon.png';
    }
    res.status(200).json(me);
  } catch (err) {
    next(err);
  }
};

// 내 프로필 정보 수정하기
export const changeMyInfo = async (req, res, next) => {
  try {
    console.log(req.file);
    console.log(req.body.thumbnail);

    if (req.file) {
      console.log('hit');
    }

    let { nickname, message, thumbnail } = req.body;
    // 썸네일 파일 업로드가 이루어진 경우에만 req.file이 존재
    if (req.file) {
      thumbnail = req.file.location;
    }
    await user.update(
      { nickname, message, thumbnail },
      {
        where: {
          id: res.locals.user.id,
        },
      },
    );
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
