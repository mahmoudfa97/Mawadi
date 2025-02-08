import { Request, Response } from 'express';
import Coupon from '../models/Coupon.model';
import { paginateResults } from '../utils/pagination';

export const getAllCoupons = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const coupons = await paginateResults(Coupon, {}, page, limit);
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching coupons', error });
  }
};

export const getCouponById = async (req: Request, res: Response) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
        res.status(404).json({ message: 'Coupon not found' });
      return 
    }
    res.status(200).json(coupon);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching coupon', error });
  }
};

export const createCoupon = async (req: Request, res: Response) => {
  try {
    const newCoupon = new Coupon(req.body);
    await newCoupon.save();
    res.status(201).json(newCoupon);
  } catch (error) {
    res.status(500).json({ message: 'Error creating coupon', error });
  }
};

export const updateCoupon = async (req: Request, res: Response) => {
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCoupon) {
        res.status(404).json({ message: 'Coupon not found' });
      return
    }
    res.status(200).json(updatedCoupon);
  } catch (error) {
    res.status(500).json({ message: 'Error updating coupon', error });
  }
};

export const deleteCoupon = async (req: Request, res: Response) => {
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!deletedCoupon) {
        res.status(404).json({ message: 'Coupon not found' });
      return 
    }
    res.status(200).json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting coupon', error });
  }
};

export const validateCouponCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({ code, isActive: true });

    if (!coupon) {
        res.status(404).json({ message: 'Invalid or inactive coupon code' });
      return
    }

    if (coupon.endDate && new Date() > coupon.endDate) {
        res.status(400).json({ message: 'Coupon has expired' });
      return
    }

    res.status(200).json({ message: 'Coupon is valid', coupon });
  } catch (error) {
    res.status(500).json({ message: 'Error validating coupon', error });
  }
};