import { tutorial, category, lecture } from '../../models';

export const list = async (req, res, next) => {
  try {
    const { category: wantedCategory } = req.params;
    // params로 받은 카테고리가 존재하지 않으면 잘못된 요청
    const doesExist = await category.count({
      where: {
        engName: wantedCategory,
      },
    });
    if (!doesExist) {
      return res
        .status(400)
        .json({ message: '해당 카테고리는 존재하지 않습니다' });
    }

    const tutorials = await tutorial.findAll({ category });
    return res.status(200).json(tutorials);
  } catch (err) {
    next(err);
  }
};

// ?page=x
export const getMyTutorials = async (req, res, next) => {
  try {
    const { page } = req.query;
    const result = await tutorial.findAndCountAll({
      where: {
        user_id: res.locals.user.id,
      },
      offset: parseInt(page),
      limit: 5,
      include: {
        model: lecture,
        as: 'lectures',
      },
    });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

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
