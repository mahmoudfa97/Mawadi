import express from 'express';
import * as giftCardController from '../controllers/giftCardController';
import { authenticateUser, authorizeAdmin } from '../middleware/auth';
import { validateGiftCard } from '../middleware/validation';

const router = express.Router();

router.get('/', authenticateUser, authorizeAdmin, giftCardController.getAllGiftCards);
router.get('/:id', authenticateUser, giftCardController.getGiftCardById);
router.post('/', authenticateUser, validateGiftCard, giftCardController.createGiftCard);
router.put('/:id', authenticateUser, authorizeAdmin, validateGiftCard, giftCardController.updateGiftCard);
router.delete('/:id', authenticateUser, authorizeAdmin, giftCardController.deleteGiftCard);
router.post('/redeem', authenticateUser, giftCardController.redeemGiftCard);

export default router;