import { Request, Response } from 'express';
import User from '../models/User.model';
import Order from '../models/Order.model';
import Product, { IProduct } from '../models/Product.model';

// View all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
  
      const users = await User.find({}).select('-password').skip(skip).limit(limit);
      const total = await User.countDocuments();
  
      res.json({
        users,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users' });
    }
  };
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return 
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};
export const updateProduct =  async (req: Request, res: Response): Promise<void>  => {
  try {
    const product: IProduct | null = await Product.findById(req.params.id);
    if (product == null) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    if (req.body.name != null) {
      product.name = req.body.name;
    }
    if (req.body.description != null) {
      product.description = req.body.description;
    }
    if (req.body.price != null) {
      product.price = req.body.price;
    }
    if (req.body.category != null) {
      product.category = req.body.category;
    }
    if (req.body.tags != null) {
      product.tags = req.body.tags;
    }
    if (req.body.occasion != null) {
      product.occasions = req.body.occasion;
    }


    const updatedProduct: IProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
}
// Block/unblock a user
export const toggleBlockUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return;
    };

    user.isBlocked = !user.isBlocked;
    await user.save();
    res.json({ message: 'User status updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// View all orders
export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find({}).populate('user', 'name email').skip(skip).limit(limit);
    const total = await Order.countDocuments();

    res.json({
      orders,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalOrders: total,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

// Update order status
export const updateOrderStatus = async (req: Request<{ orderId: string }>, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order){ 
      res.status(404).json({ message: 'Order not found' });
      return ;
    }

    order.orderStatus = req.body.status;
    await order.save();
    res.json({ message: 'Order status updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add product
export const addProduct = async (req: Request, res: Response): Promise<void> => {
  const { name, price, description, stock } = req.body;
  const newProduct = new Product({ name, price, description, stock });
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete product
export const deleteProduct = async (req: Request<{ productId: string }>, res: Response): Promise<void> => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find({}).skip(skip).limit(limit);
    const total = await Product.countDocuments();

    res.json({
      products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};