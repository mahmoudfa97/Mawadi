import { Request, Response } from 'express';
import GiftCard from '../models/giftcard.model';
import User from '../models/User.model';
import { paginateResults } from '../utils/pagination';

export const getAllGiftCards = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const giftCards = await paginateResults(GiftCard, {}, page, limit);
    res.status(200).json(giftCards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gift cards', error });
  }
};

export const getGiftCardById = async (req: Request, res: Response) => {
  try {
    const giftCard = await GiftCard.findById(req.params.id);
    if (!giftCard) {
      res.status(404).json({ message: 'Gift card not found' });
      return 
    }
    res.status(200).json(giftCard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gift card', error });
  }
};

export const createGiftCard = async (req: Request, res: Response) => {
  try {
    const newGiftCard = new GiftCard({
      ...req.body,
      purchasedBy: req.body.user?.id,
    });
    await newGiftCard.save();
    res.status(201).json(newGiftCard);
  } catch (error) {
    res.status(500).json({ message: 'Error creating gift card', error });
  }
};

export const updateGiftCard = async (req: Request, res: Response) => {
  try {
    const updatedGiftCard = await GiftCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedGiftCard) {
      res.status(404).json({ message: 'Gift card not found' });
      return 
    }
    res.status(200).json(updatedGiftCard);
  } catch (error) {
    res.status(500).json({ message: 'Error updating gift card', error });
  }
};

export const deleteGiftCard = async (req: Request, res: Response) => {
  try {
    const deletedGiftCard = await GiftCard.findByIdAndDelete(req.params.id);
    if (!deletedGiftCard) {
      res.status(404).json({ message: 'Gift card not found' });
    }
    res.status(200).json({ message: 'Gift card deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting gift card', error });
  }
};

export const redeemGiftCard = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const giftCard = await GiftCard.findOne({ code, isRedeemed: false });

    if (!giftCard) {
      res.status(404).json({ message: 'Invalid or already redeemed gift card' });
      return
    }

    if (giftCard.expiryDate && new Date() > giftCard.expiryDate) {
      res.status(400).json({ message: 'Gift card has expired' });
      return
    }

    const user = await User.findById(req.body.user?.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    user.loyaltyPoints += giftCard.currentBalance;
    await user.save();

    giftCard.isRedeemed = true;
    giftCard.purchasedBy = req.body.user?.id;
    giftCard.redeemedDate = new Date();
    await giftCard.save();

    res.status(200).json({ message: 'Gift card redeemed successfully', balance: user.loyaltyPoints });
  } catch (error) {
    res.status(500).json({ message: 'Error redeeming gift card', error });
  }
};