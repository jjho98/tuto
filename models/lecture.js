import mongoose from 'mongoose';
const { Schema } = mongoose;

export const lectureSchema = new Schema(
  {
    embed: String,
    title: String,
    duration: Number,
  },
  {
    timestamps: true,
  },
);

const Lecture = mongoose.model('Lecture', lectureSchema);
export default Lecture;
