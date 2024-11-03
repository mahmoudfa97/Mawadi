import { GiftItem, ShippingInfo, OrderSummary, TrackingInfo } from '../components/Constants/Constants';

export const SELECT_GIFT = 'SELECT_GIFT';
export const UPDATE_SHIPPING_INFO = 'UPDATE_SHIPPING_INFO';
export const UPDATE_PAYMENT_METHOD = 'UPDATE_PAYMENT_METHOD';
export const ATTACH_VIDEO_MESSAGE = 'ATTACH_VIDEO_MESSAGE';
export const UPDATE_ORDER_SUMMARY = 'UPDATE_ORDER_SUMMARY';
export const PLACE_ORDER = 'PLACE_ORDER';
export const SET_TRACKING_INFO = 'SET_TRACKING_INFO';

export const selectGift = (gift: GiftItem) => ({
  type: SELECT_GIFT,
  payload: gift,
});

export const updateShippingInfo = (shippingInfo: ShippingInfo) => ({
  type: UPDATE_SHIPPING_INFO,
  payload: shippingInfo,
});

export const updatePaymentMethod = (method: 'creditCard' | 'paypal') => ({
  type: UPDATE_PAYMENT_METHOD,
  payload: method,
});

export const attachVideoMessage = (file: string) => ({
  type: ATTACH_VIDEO_MESSAGE,
  payload: file,
});

export const updateOrderSummary = (summary: OrderSummary) => ({
  type: UPDATE_ORDER_SUMMARY,
  payload: summary,
});

export const placeOrder = () => ({
  type: PLACE_ORDER,
});

export const setTrackingInfo = (trackingInfo: TrackingInfo) => ({
  type: SET_TRACKING_INFO,
  payload: trackingInfo,
});