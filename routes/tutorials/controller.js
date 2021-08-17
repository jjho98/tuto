import { tutorial, category } from '../../models';

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
