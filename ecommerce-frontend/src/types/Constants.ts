interface Reviews {
  rating: number;
  comment: string;
  name: string;
  dateCommented: string;
  commentTitle: string;
}
export interface IProduct {
  status: unknown;
  id: number;
  name: string;
  brand: string;
  category: string;
  weight: string;
  gender: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  image: string;
  additionalImages: string[];
  colors:string[];
  discount:string;
  tax:number;
  originalPrice: number;
  tagNumber:string
  sizes:string[];
  tags: string[];
  occasion: string[];
  personalization: {
    videoFile?: File,
    customMessage: string
  };
  type: string;
  SKU: number;
  inStock: {
    left: number;
    sold: number;
  }
  productCode: string;
  reviews: Reviews[];
  salesCount: number;
  dimensions: string;
  dateAdded: string;
  deliveryTime: string;
  estimatedDeliveryDate: string;
  features: string[];
  peopleAlsoBuy: {
    name: string;
    price: number;
  }[];
}
  
export interface CartItem extends IProduct {
  quantity: number;
}
export interface IOccasions {
 name: string, 
 icon: string
}
export interface ICategories {
  name: string, 
  icon?: string,
  subCategories?: SubCategory[]
}
export interface IUtils {
  occasions: IOccasions[]
  categories: ICategories[]
}
export interface SubCategory{
  name: string
}
export interface PersonalizationPayload {
  itemId: string;
  isEnabled: boolean
  videoFile?: any;
  customMessage?: string;
}
export interface GiftItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  zipCode: string;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface TrackingInfo {
  trackingNumber: string;
  estimatedDelivery: string;
  status: string;
}

export interface CheckoutState {
  selectedGift: GiftItem | null;
  shippingInfo: ShippingInfo;
  paymentMethod: 'creditCard' | 'paypal';
  videoMessage: File | null;
  orderSummary: OrderSummary;
  trackingInfo: TrackingInfo | null;
}
