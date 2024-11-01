import express from 'express';
import * as reviewController from '../controllers/reviewController';
import { authenticateUser } from '../middleware/auth';
import { validateReview } from '../middleware/validation';

const router = express.Router();

router.get('/product/:productId', reviewController.getProductReviews);
router.post('/', authenticateUser, validateReview, reviewController.createReview);
router.put('/:id', authenticateUser, validateReview, reviewController.updateReview);
router.delete('/:id', authenticateUser, reviewController.deleteReview);

export default router;