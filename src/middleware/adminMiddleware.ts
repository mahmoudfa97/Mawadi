import { Request, Response, NextFunction } from 'express';
import User from '../models/User.model';
import jwt from 'jsonwebtoken';

export const verifyAdmin = async (req: any, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded: any = jwt.verify(token, 'secret');
    const user = await User.findById(decoded.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Admin privileges required' });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: 'Failed to authenticate' });
  }
};
