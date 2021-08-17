import jwt from 'jsonwebtoken';
const issueToken = async (userId) => {
  const token = jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_KEY,
    {
      expiresIn: '7d',
    },
  );
  return token;
};

export default issueToken;
