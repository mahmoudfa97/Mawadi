import {
    SELECT_GIFT,
    UPDATE_SHIPPING_INFO,
    UPDATE_PAYMENT_METHOD,
    ATTACH_VIDEO_MESSAGE,
    UPDATE_ORDER_SUMMARY,
    PLACE_ORDER,
    SET_TRACKING_INFO,
  } from './actions';
  import { CheckoutState } from '../components/Constants/Constants';
  
  const initialState: CheckoutState = {
    selectedGift: null,
    shippingInfo: {
      name: '',
      address: '',
      city: '',
      zipCode: '',
    },
    paymentMethod: 'creditCard',
    videoMessage: null,
    orderSummary: {
      subtotal: 0,
      shipping: 0,
      tax: 0,
      total: 0,
    },
    trackingInfo: null,
  };
  
  export const checkoutReducer = (state = initialState, action: any): CheckoutState => {
    switch (action.type) {
      case SELECT_GIFT:
        return {
          ...state,
          selectedGift: action.payload,
        };
      case UPDATE_SHIPPING_INFO:
        return {
          ...state,
          shippingInfo: action.payload,
        };
      case UPDATE_PAYMENT_METHOD:
        return {
          ...state,
          paymentMethod: action.payload,
        };
      case ATTACH_VIDEO_MESSAGE:
        return {
          ...state,
          videoMessage: action.payload,
        };
      case UPDATE_ORDER_SUMMARY:
        return {
          ...state,
          orderSummary: action.payload,
        };
      case PLACE_ORDER:
        // Here you would typically make an API call to place the order
        console.log('Placing order:', state);
        return state;
      case SET_TRACKING_INFO:
        return {
          ...state,
          trackingInfo: action.payload,
        };
      default:
        return state;
    }
  };