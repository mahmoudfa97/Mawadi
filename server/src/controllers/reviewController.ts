import { Request, Response } from 'express';
import Review from '../models/Review.model';
import Product from '../models/Product.model';
import { paginateResults } from '../utils/pagination';

// Get product reviews
export const getProductReviews = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const reviews = await paginateResults(
      Review,
      { product: req.params.productId },
      page,
      limit,
      { path: 'user', select: 'firstName lastName' }
    );
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

// Create a review
export const createReview = async (req: Request, res: Response) => {
  try {
    const { productId, rating, title, comment } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return
    }

    const newReview = new Review({
      user: req.body.user?.id,
      product: productId,
      rating,
      title,
      comment,
    });

    await newReview.save();

    // Update product rating
    const reviews = await Review.find({ product: productId });
    product.numberOfReviews = reviews.length;
    await product.save();

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Error creating review', error });
  }
};

// Update a review
export const updateReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return
    }

    if (review.user.toString() !== req.body.user?.id) {
      res.status(403).json({ message: 'User not authorized to update this review' });
      return
    }

    const { rating, title, comment } = req.body;
    review.rating = rating || review.rating;
    review.title = title || review.title;
    review.comment = comment || review.comment;

    await review.save();

    // Update product rating
    const product = await Product.findById(review.product);
    if (product) {
      const reviews = await Review.find({ product: review.product });
      product.averageRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
      await product.save();
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error });
  }
};

// Delete a review
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return
    }

    if (review.user.toString() !== req.body.user?.id) {
      res.status(403).json({ message: 'User not authorized to delete this review' });
      return
    }

    await review.deleteOne();

    // Update product rating
    const product = await Product.findById(review.product);
    if (product) {
      const reviews = await Review.find({ product: review.product });
      product.numberOfReviews = reviews.length;
      await product.save();
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error });
  }
};