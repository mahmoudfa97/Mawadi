import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { errorHandler } from './src/middleware/errorHandler';
import { limiter, helmetMiddleware } from './src/middleware/security';

import logger from './src/utils/logger';

import productRoutes from './src/routes/productRoutes';

import orderRoutes from './src/routes/orderRoutes';
import userRoutes from './src/routes/userRoutes';
import categoryRoutes from './src/routes/categryRoutes';
import reviewRoutes from './src/routes/reviewRoutes';
import occasionRoutes from './src/routes/occasionRoutes';
import couponRoutes from './src/routes/couponRoute';
import giftCardRoutes from './src/routes/giftCardRoutes';
import adminRoutes from './src/routes/adminRoutes';
import dotenv from 'dotenv';
import path from 'path';
import './src/firebase'

dotenv.config({ path: path.join(__dirname, '.env') });

const app: Application = express();
const PORT = process.env.PORT || 5000;
// Trust the first proxy
app.set('trust proxy', 1);
app.use(cors());
// Security middleware
app.use(bodyParser.json());
app.use(helmetMiddleware);
app.use(limiter);

// Routes
app.use('/api/products', productRoutes);
app.use('/api/v2/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/occasions', occasionRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/giftcards', giftCardRoutes);





// MongoDB connection with error handling
mongoose.connect(process.env.MONGO_URL as string)
  .then(() => logger.info('MongoDB connected successfully'))
  .catch((err) => {
    logger.error('MongoDB connection error:', err);
    process.exit(1);
  });



app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
