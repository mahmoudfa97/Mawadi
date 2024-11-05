import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/User.model';
import { generateToken } from '../utils/jwt';
import admin from '../firebase';
import jwt from 'jsonwebtoken';
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, phoneNumber} = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error('User already exists');
  }

  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });

    await newUser.save();

    const token = generateToken(newUser);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Error during user registration', error });
  }
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log('Login attempt for email:', email);

  const user = await User.findOne({ email });
  if (!user) {
    console.log('User not found');
    res.status(400);
    throw new Error('User not found');
  }

  console.log('User found, comparing passwords');
  const isPasswordCorrect = await user.comparePassword(password);
  console.log('Password correct:', isPasswordCorrect);

  if (!isPasswordCorrect) {
    res.status(400);
    throw new Error('Incorrect password');
  }

  const token = generateToken(user);

  res.status(200).json({
    token,
    user: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
  });
});


export const firebaseLogin = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
     res.status(400).json({ message: 'Firebase ID token is required' });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, phone_number, name } = decodedToken;

    let user = await User.findOne({ $or: [{ firebaseUid: uid }, { email }] });

    if (!user) {
      // Create a new user if they don't exist
      const [firstName, ...lastNameParts] = (name || 'New User').split(' ');
      const lastName = lastNameParts.join(' ') || 'User';

      const newUser: Partial<IUser> = {
        email: email || `${uid}@firebase.com`, // Use a placeholder email if not provided
        firstName,
        lastName,
        phoneNumber: phone_number,
        firebaseUid: uid,
        role: 'user',
      };

      user = new User(newUser);
      await user.save();
    } else if (!user.firebaseUid) {
      // If user exists but doesn't have firebaseUid, update it
      user.firebaseUid = uid;
      if (phone_number) user.phoneNumber = phone_number;
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

    res.status(200).json({ 
      token, 
      user: { 
        id: user._id, 
        email: user.email, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        phoneNumber: user.phoneNumber, 
        role: user.role 
      } 
    });
  } catch (error) {
    console.error('Firebase login error:', error);
    res.status(401).json({ message: 'Invalid Firebase token' });
  }
};
export const getUserProfile = async (req: Request, res: Response) => {
  const { uid } = req.query
  try {
    const user = await User.findOne({ firebaseUid: uid }).select('-password')
    if (!user) {
        res.status(404).json({ message: 'User not found' });
      return
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, phoneNumber } = req.body;

    const user = await User.findById(req.body.user?.id);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
      return 
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile', error });
  }
};

export const addToWishlist = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.body.user?.id);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
      return
    }

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    res.status(200).json({ message: 'Product added to wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to wishlist', error });
  }
};

export const removeFromWishlist = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.body.user?.id);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
      return
    }

    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    await user.save();

    res.status(200).json({ message: 'Product removed from wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Error removing product from wishlist', error });
  }
};

export const getWishlist = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.user?.id).populate('wishlist');
    if (!user) {
        res.status(404).json({ message: 'User not found' });
      return 
    }

    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error });
  }
};
