import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IGiftPreference {
  occasion: string;
  category: string;
  priceRange: {
    min: number;
    max: number;
  };
}

interface IAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface IUser extends Document {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other' | 'prefer not to say';
  addresses: IAddress[];
  orders: mongoose.Types.ObjectId[];
  wishlist: mongoose.Types.ObjectId[];
  reviews: mongoose.Types.ObjectId[];
  giftPreferences?: IGiftPreference[];
  giftCardsReceived?: mongoose.Types.ObjectId[];
  giftCardsPurchased?: mongoose.Types.ObjectId[];
  firebaseUid?: string;
  isAdmin: boolean;
  isBlocked: boolean;
  registrationDate?: Date;
  lastLogin?: Date;
  profilePicture?: string;
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  loyaltyPoints: number;
  referralCode: string;
  referredBy?: mongoose.Types.ObjectId;
  role: 'user' | 'admin';
  comparePassword(candidatePassword: string): Promise<boolean>;  // Add this line
}

const AddressSchema: Schema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
});

const GiftPreferenceSchema: Schema = new Schema({
  occasion: { type: String, required: true },
  category: { type: String, required: true },
  priceRange: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
});

const UserSchema: Schema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: function() { return !this.firebaseUid; } },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other', 'prefer not to say'] },
  addresses: [AddressSchema],
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  giftPreferences: [GiftPreferenceSchema],
  isAdmin: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  registrationDate: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  profilePicture: { type: String },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  giftCardsReceived: [{ type: Schema.Types.ObjectId, ref: 'GiftCard' }],
  giftCardsPurchased: [{ type: Schema.Types.ObjectId, ref: 'GiftCard' }],
  firebaseUid: { type: String, unique: true, sparse: true },
  notificationPreferences: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    push: { type: Boolean, default: true },
  },
  loyaltyPoints: { type: Number, default: 0 },
  referralCode: { type: String, unique: true },
  referredBy: { type: Schema.Types.ObjectId, ref: 'User' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, {
  timestamps: true,
});

UserSchema.index({ email: 1, referralCode: 1 });

UserSchema.virtual('fullName').get(function(this: IUser) {
  return `${this.firstName} ${this.lastName}`;
});

function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (this.password) {
    return bcrypt.compare(candidatePassword, this.password);
  }
  return false;
};

UserSchema.pre<IUser>('save', async function(next) {
  if (this.isModified('password') && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  if (this.isNew) {
    this.referralCode = generateReferralCode();
  }
  next();
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;