// translationRoutes.ts
// Purpose: Sets up the routing for translation-related API endpoints.
// Main Functionalities:
// - Defines a POST route for `/aboutus` that triggers the `aboutus` method in the `translationController`.
// - Utilizes middleware for user authentication and validation.

import express from 'express';
import * as translationController from '../controllers/translationController';
import { authenticateUser } from '../middleware/auth';
import { validateUser } from '../middleware/validation';

const router = express.Router();

router.post('/aboutus', translationController.aboutus);

export default router;
