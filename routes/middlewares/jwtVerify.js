import jwt from 'jsonwebtoken';
// import createError from 'http-errors';

const jwtVerify = (req, res, next) => {
  const token = req.cookies.access_token;
  // jwt를 가지고 있는가?
  if (!token) {
    return next();
  }
  // jwt가 조작되지 않았는가?
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    res.locals.user = {
      id: decoded.id,
    };
    // jwt 만료 기한이 3일 이하면 재발행
  } catch (err) {
    // jwt 조작된 경우
    // next(createError(401, '토큰이 비정상입니다'));
    next();
  }
};

export default jwtVerify;
