import {
  tutorial,
  category,
  lecture,
  user,
  taking,
  portfolio,
  portfolioImage,
  sequelize,
} from '../../models';

// ?page=x 10개씩
export const list = async (req, res, next) => {
  try {
    const { category: wantedCategory } = req.params;
    // 숫자로 변환
    const page = req.query.page ? +req.query.page : 0;

    // params로 받은 카테고리가 존재하지 않으면 잘못된 요청
    // category의 id 찾기
    const result = await category.findOne({
      where: {
        engName: wantedCategory,
      },
      attributes: ['id'],
    });
    if (!result) {
      return res
        .status(400)
        .json({ message: '해당 카테고리는 존재하지 않습니다' });
    }

    const categoryId = result.dataValues.id;

    // 정상적이면 해당 카테고리의 튜토리얼 조금씩 보내주기
    const tutorials = await tutorial.findAndCountAll({
      where: {
        category_id: categoryId,
      },
      offset: parseInt(page) * 10,
      limit: 10,
      attributes: [
        'id',
        'title',
        'thumbnail',
        [sequelize.fn('COUNT', 'lectures.id'), 'lectureCount'],
        [sequelize.fn('COUNT', 'takings.id'), 'takingCount'],
      ],
      include: [
        {
          model: user,
          as: 'user',
          attributes: ['thumbnail', 'nickname'],
        },
        {
          model: lecture,
          as: 'lectures',
          attributes: [],
        },
        {
          model: taking,
          as: 'takings',
          attributes: [],
        },
      ],
      group: ['id'],
    });

    return res.status(200).json(tutorials);
  } catch (err) {
    next(err);
  }
};

// ?page=x 10개씩
export const getMyTutorials = async (req, res, next) => {
  try {
    const { page } = req.query;
    const result = await tutorial.findAndCountAll({
      where: {
        user_id: res.locals.user.id,
      },
      offset: parseInt(page) * 10,
      limit: 10,
      attributes: [
        'id',
        'title',
        'thumbnail',
        [sequelize.fn('COUNT', 'lectures.id'), 'lectureCount'],
        [sequelize.fn('COUNT', 'takings.id'), 'takingCount'],
      ],
      include: [
        {
          model: user,
          as: 'user',
          attributes: ['thumbnail', 'nickname'],
        },
        {
          model: lecture,
          as: 'lectures',
          attributes: [],
        },
        {
          model: taking,
          as: 'takings',
          attributes: [],
        },
      ],
      group: ['id'],
    });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// 튜토리얼 생성
export const create = async (req, res, next) => {
  try {
    const { title, content, category_id } = req.body;
    if (!title || !content || !category_id) {
      return res.status(400).json({ message: '작성되지 않은 항목이 있습니다' });
    }

    await tutorial.create({
      title,
      content,
      category_id,
      user_id: res.locals.user.id,
      thumbnail: req.file
        ? req.file.location
        : 'https://tuto-bucket.s3.ap-northeast-2.amazonaws.com/tutorial-null.png',
    });

    return res.status(200).json({ messgae: '정상적으로 생성됐습니다' });
  } catch (err) {
    next(err);
  }
};

// 튜토리얼 자세히 보기
export const getDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await tutorial.findOne({
      where: { id },
    });
    console.log(result.dataValues);
  } catch (err) {
    next(err);
  }
};
