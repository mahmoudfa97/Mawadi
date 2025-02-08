import express from 'express';
import * as couponController from '../controllers/couponController';
import { authenticateUser, authorizeAdmin } from '../middleware/auth';
import { validateCoupon } from '../middleware/validation';

const router = express.Router();

router.get('/', authenticateUser, authorizeAdmin, couponController.getAllCoupons);
router.get('/:id', authenticateUser, authorizeAdmin, couponController.getCouponById);
router.post('/', authenticateUser, authorizeAdmin, validateCoupon, couponController.createCoupon);
router.put('/:id', authenticateUser, authorizeAdmin, validateCoupon, couponController.updateCoupon);
router.delete('/:id', authenticateUser, authorizeAdmin, couponController.deleteCoupon);
router.post('/validate', authenticateUser, couponController.validateCouponCode);

export default router;