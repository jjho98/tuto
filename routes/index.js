import { Router } from 'express';
import tutorials from './tutorials';
import categories from './categories';
import auth from './auth';
import users from './users';
import portfolios from './portfolios';
import jwtVerify from './middlewares/jwtVerify';

const router = new Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).json({ message: '어서오세요' });
});

router.use('/auth', auth);

// 인증 로직 외에는 로그인 필요
router.use(jwtVerify);
// res.locals.user의 id에 user id가 들어있음
router.use('/tutorials', tutorials);
router.use('/categories', categories);
router.use('/users', users);
router.use('/portfolios', portfolios);

export default router;
