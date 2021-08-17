const checkLoggedIn = (req, res, next) => {
  if (!res.locals.user) {
    return res.satsu(401).json({ message: '로그인이 필요합니다' });
  }
  return next();
};

export default checkLoggedIn;
