import Category from '../../models/category';

export const list = async (req, res, next) => {
  try {
    const result = await Category.find({});
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const result = await Category.create(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
