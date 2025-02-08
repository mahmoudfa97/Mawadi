import express from 'express';
import * as categoryController from '../controllers/categoryController';
import { authenticateUser, authorizeAdmin } from '../middleware/auth';
import { validateCategory } from '../middleware/validation';

const router = express.Router();

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', authenticateUser, authorizeAdmin, validateCategory, categoryController.createCategory);
router.put('/:id', authenticateUser, authorizeAdmin, validateCategory, categoryController.updateCategory);
router.delete('/:id', authenticateUser, authorizeAdmin, categoryController.deleteCategory);

export default router;