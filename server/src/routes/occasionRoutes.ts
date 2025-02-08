import express from 'express';
import * as occasionController from '../controllers/occassionController';
import { authenticateUser, authorizeAdmin } from '../middleware/auth';
import { validateOccasion } from '../middleware/validation';

const router = express.Router();

router.get('/', occasionController.getAllOccasions);
router.get('/:id', occasionController.getOccasionById);
router.post('/', authenticateUser, authorizeAdmin, validateOccasion, occasionController.createOccasion);
router.put('/:id', authenticateUser, authorizeAdmin, validateOccasion, occasionController.updateOccasion);
router.delete('/:id', authenticateUser, authorizeAdmin, occasionController.deleteOccasion);

export default router;