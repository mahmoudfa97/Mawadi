import express from 'express';
import * as translationController from '../controllers/translationController';
import { authenticateUser } from '../middleware/auth';
import { validateUser } from '../middleware/validation';

const router = express.Router();

router.post('/aboutus',  translationController.aboutus);

export default router;