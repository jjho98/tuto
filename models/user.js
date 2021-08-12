import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
const { ObjectId } = mongoose.Types;

const userSchema = new Schema(
  {
    email: String,
    password: String,
    nickname: String,
    thumbnail: String,
    message: String,
    takingTutorials: [ObjectId],
    takenTutorials: [ObjectId],
    recommendation: String,
  },
  {
    timestamps: true,
  },
);

userSchema.methods.issueToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      nickname: this.nickname,
    },
    process.env.JWT_KEY,
    {
      expiresIn: '7d',
    },
  );
  return token;
};

const User = mongoose.model('User', userSchema);
export default User;
