import mongoose, { Document, Schema } from 'mongoose';

interface IOrderItem {
  product: mongoose.Types.ObjectId;
  variant: string;
  quantity: number;
  price: number;
}

interface IShippingDetails {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  couponUsed?: mongoose.Types.ObjectId;
  giftCardUsed?: mongoose.Types.ObjectId;
  totalAmount: number;
  shippingDetails: IShippingDetails;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  giftMessage?: string;
  isGift: boolean;
  recipientEmail?: string;
  recipientPhone?: string;
}

const OrderItemSchema: Schema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  variant: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const ShippingDetailsSchema: Schema = new Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
});

const OrderSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [OrderItemSchema],
  totalAmount: { type: Number, required: true },
  shippingDetails: ShippingDetailsSchema,
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  orderStatus: { type: String, enum: ['processing', 'shipped', 'delivered', 'cancelled'], default: 'processing' },
  couponUsed: { type: Schema.Types.ObjectId, ref: 'Coupon' },
  giftCardUsed: { type: Schema.Types.ObjectId, ref: 'GiftCard' },
  trackingNumber: { type: String },
  giftMessage: { type: String },
  isGift: { type: Boolean, default: false },
  recipientEmail: { type: String },
  recipientPhone: { type: String },
}, {
  timestamps: true,
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;