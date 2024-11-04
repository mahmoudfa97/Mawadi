import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import { errorHandler } from './src/middleware/errorHandler';
import { limiter } from './src/middleware/security';
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

import './src/firebase';

dotenv.config({ path: path.join(__dirname, '.env') });

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);
app.use(cors());
app.use(express.json());
app.use(helmet());
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

// MongoDB connection
mongoose.connect(process.env.MONGO_URL as string)
  .then(() => logger.info('MongoDB connected successfully'))
  .catch((err) => {
    logger.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

export default app;