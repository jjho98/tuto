import jwt from 'jsonwebtoken';
import issueToken from '../../lib/issueToken';
// import createError from 'http-errors';

const jwtVerify = async (req, res, next) => {
  const token = req.cookies.access_token;
  // jwt를 가지고 있는가?
  if (!token) {
    console.log('not loggedin user');
    return next();
  }
  // jwt가 조작되지 않았는가?
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    res.locals.user = {
      id: decoded.id,
    };
    // jwt 만료 기한이 3일 이하면 재발행
    const now = Date.now();
    if (decoded.exp - now <= -1000 * 60 * 60 * 24 * 3) {
      // 토큰 발행
      const token = await issueToken(decoded.id);
      res.cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }
    return next();
  } catch (err) {
    // jwt 조작된 경우
    // next(createError(401, '토큰이 비정상입니다'));
    return next();
  }
};

export default jwtVerify;
