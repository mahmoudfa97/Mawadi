import { Router } from 'express';

import * as orderController from '../controllers/orderController';
import { authenticateUser, authorizeAdmin } from '../middleware/auth';
import path from 'path';

const multer = require('multer');
interface MulterRequest extends Request {
  file?: any;
}

const router = Router();
// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: (arg0: null, arg1: string) => void) => {
    cb(null, 'uploads/');
  },
  filename: (req: any, file: { originalname: any; }, cb: (arg0: null, arg1: any) => void) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/', authenticateUser, orderController.createOrder);
router.get('/', authenticateUser, orderController.getUserOrders);
router.get('/:id', authenticateUser, orderController.getOrderById);
router.put('/:id/pay', authenticateUser, orderController.updateOrderToPaid);
router.put('/:id/deliver', authenticateUser, authorizeAdmin, orderController.updateOrderToDelivered);

export default router;
