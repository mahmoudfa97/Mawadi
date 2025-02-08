import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description: string;
  image: string;
  parentCategory?: mongoose.Types.ObjectId;
  subCategories: mongoose.Types.ObjectId[];
  products: mongoose.Types.ObjectId[];
  isActive: boolean;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  parentCategory: { type: Schema.Types.ObjectId, ref: 'Category' },
  subCategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});

const Category = mongoose.model<ICategory>('Category', CategorySchema);
export default Category;