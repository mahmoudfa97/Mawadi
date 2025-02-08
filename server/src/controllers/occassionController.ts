import { Request, Response } from 'express';
import Occasion from '../models/Occasion.model';
import { paginateResults } from '../utils/pagination';

export const getAllOccasions = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const occasions = await paginateResults(Occasion, {}, page, limit);
    res.status(200).json(occasions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching occasions', error });
  }
};

export const getOccasionById = async (req: Request, res: Response) => {
  try {
    const occasion = await Occasion.findById(req.params.id).populate('suggestedProducts');
    if (!occasion) {
     res.status(404).json({ message: 'Occasion not found' });
    }
    res.status(200).json(occasion);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching occasion', error });
  }
};

export const createOccasion = async (req: Request, res: Response) => {
  try {
    const newOccasion = new Occasion(req.body);
    await newOccasion.save();
    res.status(201).json(newOccasion);
  } catch (error) {
    res.status(500).json({ message: 'Error creating occasion', error });
  }
};

export const updateOccasion = async (req: Request, res: Response) => {
  try {
    const updatedOccasion = await Occasion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOccasion) {
      res.status(404).json({ message: 'Occasion not found' });
    }
    res.status(200).json(updatedOccasion);
  } catch (error) {
    res.status(500).json({ message: 'Error updating occasion', error });
  }
};

export const deleteOccasion = async (req: Request, res: Response) => {
  try {
    const deletedOccasion = await Occasion.findByIdAndDelete(req.params.id);
    if (!deletedOccasion) {
      res.status(404).json({ message: 'Occasion not found' });
    }
    res.status(200).json({ message: 'Occasion deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting occasion', error });
  }
};