import jwt from 'jsonwebtoken';
import createError from 'http-errors';

const jwtVerify = async (req, res, next) => {
  let token = '';
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    token = req.headers.authorization.split(' ')[1];
    console.log(req.headers.authorization);
  }
  console.log(req.headers);
  // jwt를 가지고 있는가?
  if (!token) {
    console.log('not loggedin user');
    return res.status(401).json({ message: '로그인이 필요합니다' });
  }
  // jwt가 조작되지 않았는가?
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    res.locals.user = {
      id: decoded.id,
    };
    return next();
  } catch (err) {
    // jwt 조작된 경우
    return next(createError(401, '토큰이 비정상입니다'));
  }
};

export default jwtVerify;
