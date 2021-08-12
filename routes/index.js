import { Router } from 'express';
const router = new Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).json({ message: '어서오세요' });
});

export default router;
