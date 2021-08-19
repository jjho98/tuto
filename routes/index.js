import { Router } from 'express';
import tutorials from './tutorials';
import categories from './categories';
import auth from './auth';
const router = new Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).json({ message: '어서오세요' });
});

router.use('/auth', auth);
router.use('/tutorials', tutorials);
router.use('/categories', categories);

export default router;
