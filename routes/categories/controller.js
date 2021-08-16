import Category from '../../models/category';

export const list = async (req, res, next) => {
  try {
    const result = await Category.find({});
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// export const create = async (req, res, next) => {
//   try {
//     const { name, emoji } = req.body;
//     if (!name || !emoji) {
//       res.status(400).json({ message: '이름과 이모지를 작성해주세요' });
//     }
//     const result = await Category.create(req.body);
//     res.status(200).json(result);
//   } catch (err) {
//     next(err);
//   }
// };
