import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User.model';
import { auth as firebaseAuth } from 'firebase-admin';
interface customRequest extends Request {
user?: IUser
}
export const authenticateUser = async (req: customRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ message: 'Authentication required' });
      return
    }

    let userId: string;

    try {
      // First, try to verify as a JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
      userId = decoded.id;
    } catch (jwtError) {
      // If JWT verification fails, try to verify as a Firebase token
      try {
        const decodedToken = await firebaseAuth().verifyIdToken(token);
        userId = decodedToken.uid;
      } catch (firebaseError) {
        throw new Error('Invalid token');
      }
    }

    const user = await User.findById(userId).select('-password');

    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
export const authorizeAdmin = (req: customRequest, res: Response, next: NextFunction) => {
  console.log('req: ',req)

  if (req.body.user && req.body.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};