import mongoose, { Document, Schema } from 'mongoose';

interface IProductVariant {
  _id: number
  name: string;
  price: number;
  stock: number;
  sku: string;
}

export interface IProduct extends Document {
  price: any;
  name: string;
  description: string;
  category: mongoose.Types.ObjectId;
  subCategory: mongoose.Types.ObjectId;
  reviews: mongoose.Types.ObjectId[];
  relatedProducts: mongoose.Types.ObjectId[];
  occasions: mongoose.Types.ObjectId[];
  brand: string;
  basePrice: number;
  variants: IProductVariant[];
  images: string[];
  tags: string[];
  averageRating: number;
  numberOfReviews: number;
  isCustomizable: boolean;
  customizationOptions?: string[];
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  weight?: {
    value: number;
    unit: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductVariantSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  sku: { type: String, required: true, unique: true },
});

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  subCategory: { type: Schema.Types.ObjectId, ref: 'Category' },
  brand: { type: String, required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  relatedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  occasions: [{ type: Schema.Types.ObjectId, ref: 'Occasion' }],
  basePrice: { type: Number, required: true },
  variants: [ProductVariantSchema],
  images: [{ type: String, required: true }],
  tags: [{ type: String }],
  averageRating: { type: Number, default: 0 },
  numberOfReviews: { type: Number, default: 0 },
  isCustomizable: { type: Boolean, default: false },
  customizationOptions: [{ type: String }],
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: String,
  },
  weight: {
    value: Number,
    unit: String,
  },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});

ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;