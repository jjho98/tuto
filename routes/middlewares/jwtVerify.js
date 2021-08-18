import jwt from 'jsonwebtoken';
import createError from 'http-errors';

const jwtVerify = async (req, res, next) => {
  const token = req.cookies.access_token;
  // jwt를 가지고 있는가?
  if (!token) {
    console.log('not loggedin user');
    return res.status(401).json({ message: '로그인 해주세요' });
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
