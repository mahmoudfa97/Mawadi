import { Request, Response } from 'express';
import Order from '../models/Order.model';
import User, { IUser } from '../models/User.model';
import Product from '../models/Product.model';
import { CustomRequest } from '../types/interfaces';

// Custom request type to include userId


export const createOrder = async (req: Request, res: Response) => {
  try {
    const { orderItems, shippingDetails, paymentMethod, totalAmount } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ message: 'No order items' });
      return
    }

    const order = new Order({
      user: req.body.user?.id,
      orderItems,
      shippingDetails,
      paymentMethod,
      totalAmount,
    });

    const createdOrder = await order.save();

     // Update product stock for the correct variant
     for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        const variant = product.variants.find(v => v._id.toString() === item.variant);

        if (variant) {
          variant.stock -= item.quantity; // Decrease the stock of the correct variant
          await product.save(); // Save the product with the updated variant stock
        }
      }
    }

    res.status(201).json(createdOrder);
  } catch (error) {
   res.status(500).json({ message: 'Error creating order', error });
  }
};
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.body.user?.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};

export const updateOrderToPaid = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return
    }

    order.paymentStatus = 'paid'
    order.orderStatus = 'processing'

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order to paid', error });
  }
};

export const updateOrderToDelivered = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return
    }

    order.orderStatus =  'delivered';

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order to delivered', error });
  }
};