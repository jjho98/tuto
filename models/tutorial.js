import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;
import { lectureSchema } from './lecture';

const tutorialSchema = new Schema(
  {
    title: String,
    content: String,
    category: String,
    lectures: [lectureSchema],
    thumbnail: String,
    tutor: ObjectId,
    tutees: [ObjectId],
  },
  {
    timestamps: true,
  },
);

const Tutorial = mongoose.model('Tutorial', tutorialSchema);
export default Tutorial;
