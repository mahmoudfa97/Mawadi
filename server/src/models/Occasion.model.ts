import mongoose, { Document, Schema } from 'mongoose';

export interface IOccasion extends Document {
  name: string;
  description: string;
  image: string;
  suggestedProducts: mongoose.Types.ObjectId[];
  categories: mongoose.Types.ObjectId[];
  isActive: boolean;
}

const OccasionSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  suggestedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});

const Occasion = mongoose.model<IOccasion>('Occasion', OccasionSchema);
export default Occasion;