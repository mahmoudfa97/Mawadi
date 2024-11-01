import { Router } from 'express';
import * as adminController from '../controllers/adminController';
import { authorizeAdmin } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import Joi from 'joi';

const router = Router();


const userUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  email: Joi.string().email(),
  role: Joi.string().valid('user', 'admin'),
});

const productSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  description: Joi.string().required().min(10),
  price: Joi.number().required().min(0),
  stock: Joi.number().required().min(0),
  category: Joi.string().required(),
});

const orderStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'processing', 'shipped', 'delivered').required(),
});

// User management routes
router.get('/users', authorizeAdmin,adminController.getUsers);
router.put('/users/:id', authorizeAdmin, validateRequest(userUpdateSchema),adminController.updateUser);
router.delete('/users/:id', authorizeAdmin,adminController.deleteUser);
router.patch('/users/:userId/block', authorizeAdmin,adminController.toggleBlockUser);
// Order management routes
router.get('/orders', authorizeAdmin,adminController.getOrders);
router.patch('/orders/:orderId', authorizeAdmin, validateRequest(orderStatusSchema),adminController.updateOrderStatus);


// Product management routes
router.post('/products', authorizeAdmin, validateRequest(productSchema),adminController.addProduct);
router.put('/products/:id', authorizeAdmin, validateRequest(productSchema),adminController.updateProduct);
router.delete('/products/:id', authorizeAdmin,adminController.deleteProduct);
router.get('/orders', authorizeAdmin, adminController.getOrders);
export default router;
