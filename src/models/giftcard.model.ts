import mongoose, { Document, Schema } from 'mongoose';

export interface IGiftCard extends Document {
  code: string;
  initialBalance: number;
  currentBalance: number;
  expiryDate: Date;
  issuedTo: mongoose.Types.ObjectId;
  purchasedBy: mongoose.Types.ObjectId;
  isActive: boolean;
  isRedeemed: boolean;
  redeemedDate?: Date;
}

const GiftCardSchema: Schema = new Schema({
  code: { type: String, required: true, unique: true },
  initialBalance: { type: Number, required: true },
  currentBalance: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  issuedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  purchasedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  isActive: { type: Boolean, default: true },
  isRedeemed: { type: Boolean, default: false },
  redeemedDate: { type: Date },
}, {
  timestamps: true,
});

const GiftCard = mongoose.model<IGiftCard>('GiftCard', GiftCardSchema);
export default GiftCard;