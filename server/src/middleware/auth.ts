import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User.model';
import { auth as firebaseAuth } from 'firebase-admin';

export interface CustomRequest extends Request {
  role?: string;
  userId?: string
}

export const authenticateUser = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ message: 'Authentication required' });
      return; // Early return to stop further execution
    }

    let userId: string;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
      userId = decoded.id;
    } catch (jwtError) {
      try {
        const decodedToken = await firebaseAuth().verifyIdToken(token);
        userId = decodedToken.uid;
      } catch (firebaseError) {
        res.status(401).json({ message: 'Invalid token' }); // Send response instead of throwing
        return; // Early return
      }
    }

    const user = await User.findById(userId).select('-password');

    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return; // Early return
    }

    req.role = user.role;
    req.userId = userId;
    next(); // Proceed to the next middleware
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorizeAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.headers.role && req.headers.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};