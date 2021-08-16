import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema({
  name: String,
  value: String,
  emoji: String,
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
