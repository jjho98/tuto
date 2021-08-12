import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema({
  name: String,
});

const Category = mongoose.model('CategorySchema', categorySchema);
export default Category;
