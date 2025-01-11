// userRoutes.ts
// Purpose: Sets up the routing for user-related API endpoints.
// Main Functionalities:
// - Defines routes for user registration, login, profile management, and wishlist functionalities.
// - Includes middleware for user authentication and validation.

import express from 'express';
import * as userController from '../controllers/userController';
import { authenticateUser } from '../middleware/auth';
import { validateUser } from '../middleware/validation';

const router = express.Router();

router.post('/register', validateUser, userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/firebase-login', userController.firebaseLogin);
router.get('/profile', authenticateUser, userController.getUserProfile);
router.put('/profile', authenticateUser, validateUser, userController.updateUserProfile);
router.post('/wishlist', authenticateUser, userController.addToWishlist);
router.delete('/wishlist/:productId', authenticateUser, userController.removeFromWishlist);
router.get('/wishlist', authenticateUser, userController.getWishlist);

export default router;
