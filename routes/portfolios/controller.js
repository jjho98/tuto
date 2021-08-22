import { portfolio, lecture, portfolioImage, tutorial } from '../../models';

// 내가 올린 작품 모아보기
// ?page=x
// 5개씩 읽기
export const getMyPortfolios = async (req, res, next) => {
  try {
    const { page } = req.query;
    const result = await portfolio.findAndCountAll({
      where: {
        user_id: res.locals.user.id,
      },
      order: [['id', 'DESC']],
      offset: parseInt(page),
      limit: 5,
      attributes: ['id', 'updatedAt'],
      // lecture가 삭제됐다면?
      include: [
        {
          model: lecture,
          as: 'lecture',
          attributes: ['id', 'title'],
          include: {
            model: tutorial,
            as: 'tutorial',
            attributes: ['id', 'thumbnail'],
          },
        },
        {
          model: portfolioImage,
          as: 'portfolioImages',
          attributes: ['uri'],
        },
      ],
    });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
