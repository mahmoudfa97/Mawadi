import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return
  }
  next();
};


export const validateUser = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('phoneNumber').optional().isMobilePhone('any').withMessage('Invalid phone number'),
    body('dateOfBirth').optional().isISO8601().toDate().withMessage('Invalid date of birth'),
    body('gender').optional().isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
    handleValidationErrors,
  ];
  
  export const validateProduct = [
    body('name').notEmpty().withMessage('Product name is required'),
    body('description').notEmpty().withMessage('Product description is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('category').isMongoId().withMessage('Invalid category ID'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    body('images').isArray().withMessage('Images must be an array'),
    body('images.*').isURL().withMessage('Invalid image URL'),
    body('brand').optional().notEmpty().withMessage('Brand cannot be empty if provided'),
    body('weight').optional().isNumeric().withMessage('Weight must be a number'),
    body('dimensions').optional().isObject().withMessage('Dimensions must be an object'),
    body('dimensions.length').optional().isNumeric().withMessage('Length must be a number'),
    body('dimensions.width').optional().isNumeric().withMessage('Width must be a number'),
    body('dimensions.height').optional().isNumeric().withMessage('Height must be a number'),
    handleValidationErrors,
  ];
  
  export const validateOrder = [
    body('user').isMongoId().withMessage('Invalid user ID'),
    body('items').isArray().withMessage('Items must be an array'),
    body('items.*.product').isMongoId().withMessage('Invalid product ID'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    body('shippingAddress').isObject().withMessage('Shipping address must be an object'),
    body('shippingAddress.street').notEmpty().withMessage('Street is required'),
    body('shippingAddress.city').notEmpty().withMessage('City is required'),
    body('shippingAddress.state').notEmpty().withMessage('State is required'),
    body('shippingAddress.zipCode').notEmpty().withMessage('Zip code is required'),
    body('shippingAddress.country').notEmpty().withMessage('Country is required'),
    body('paymentMethod').isIn(['credit_card', 'paypal', 'cash_on_delivery']).withMessage('Invalid payment method'),
    body('totalAmount').isNumeric().withMessage('Total amount must be a number'),
    handleValidationErrors,
  ];
  
  export const validateCategory = [
    body('name').notEmpty().withMessage('Category name is required'),
    body('description').notEmpty().withMessage('Category description is required'),
    body('image').isURL().withMessage('Invalid image URL'),
    body('parentCategory').optional().isMongoId().withMessage('Invalid parent category ID'),
    body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
    handleValidationErrors,
  ];
  
  export const validateReview = [
    body('user').isMongoId().withMessage('Invalid user ID'),
    body('product').isMongoId().withMessage('Invalid product ID'),
    body('order').isMongoId().withMessage('Invalid order ID'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('title').notEmpty().withMessage('Review title is required'),
    body('comment').notEmpty().withMessage('Review comment is required'),
    body('images').optional().isArray().withMessage('Images must be an array'),
    body('images.*').optional().isURL().withMessage('Invalid image URL'),
    body('isVerifiedPurchase').optional().isBoolean().withMessage('isVerifiedPurchase must be a boolean'),
    handleValidationErrors,
  ];
  
  export const validateOccasion = [
    body('name').notEmpty().withMessage('Occasion name is required'),
    body('description').notEmpty().withMessage('Occasion description is required'),
    body('image').isURL().withMessage('Invalid image URL'),
    body('suggestedProducts').optional().isArray().withMessage('Suggested products must be an array'),
    body('suggestedProducts.*').optional().isMongoId().withMessage('Invalid product ID'),
    body('categories').optional().isArray().withMessage('Categories must be an array'),
    body('categories.*').optional().isMongoId().withMessage('Invalid category ID'),
    body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
    handleValidationErrors,
  ];
  
  export const validateCoupon = [
    body('code').notEmpty().withMessage('Coupon code is required'),
    body('discountType').isIn(['percentage', 'fixed']).withMessage('Invalid discount type'),
    body('discountValue').isNumeric().withMessage('Discount value must be a number'),
    body('minPurchaseAmount').optional().isNumeric().withMessage('Minimum purchase amount must be a number'),
    body('maxDiscountAmount').optional().isNumeric().withMessage('Maximum discount amount must be a number'),
    body('startDate').optional().isISO8601().toDate().withMessage('Invalid start date'),
    body('expirationDate').optional().isISO8601().toDate().withMessage('Invalid expiration date'),
    body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
    body('usageLimit').optional().isInt({ min: 1 }).withMessage('Usage limit must be a positive integer'),
    body('applicableProducts').optional().isArray().withMessage('Applicable products must be an array'),
    body('applicableProducts.*').optional().isMongoId().withMessage('Invalid product ID'),
    body('applicableCategories').optional().isArray().withMessage('Applicable categories must be an array'),
    body('applicableCategories.*').optional().isMongoId().withMessage('Invalid category ID'),
    handleValidationErrors,
  ];
  
  export const validateGiftCard = [
    body('code').notEmpty().withMessage('Gift card code is required'),
    body('amount').isNumeric().withMessage('Gift card amount must be a number'),
    body('currency').notEmpty().withMessage('Currency is required'),
    body('expirationDate').optional().isISO8601().toDate().withMessage('Invalid expiration date'),
    body('isRedeemed').optional().isBoolean().withMessage('isRedeemed must be a boolean'),
    body('redeemedBy').optional().isMongoId().withMessage('Invalid user ID'),
    body('purchasedBy').optional().isMongoId().withMessage('Invalid user ID'),
    body('recipientEmail').optional().isEmail().withMessage('Invalid recipient email'),
    body('message').optional().isString().withMessage('Message must be a string'),
    handleValidationErrors,
  ];
