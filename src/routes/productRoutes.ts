import express from 'express';
import * as productController from '../controllers/productController';
import { authenticateUser, authorizeAdmin } from '../middleware/auth';
import { validateProduct } from '../middleware/validation';

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/updates', productController.checkForUpdates);
router.get('/:id', productController.getProductById);
router.post('/', authenticateUser, authorizeAdmin, validateProduct, productController.createProduct);
router.put('/:id', authenticateUser, authorizeAdmin, validateProduct, productController.updateProduct);
router.delete('/:id', authenticateUser, authorizeAdmin, productController.deleteProduct);

export default router;
