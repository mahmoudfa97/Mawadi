import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { del, get, put } from '../../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Mail, ShoppingBag, DollarSign, Package, TrendingUp } from 'lucide-react';
import StatCard from './StatCard';
import LatestOrders from './LatestOrders';
import LatestTransactions from './LatestTransactions';
import Inbox from './Inbox';
import OrderForm from './OrderForm';
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
}

interface Order {
  _id: string;
  user: { name: string; email: string };
  totalAmount: number;
  status: string;
}

export default function  AdminDashboard() {
  const { loadedUser } = useAuth();
  const [users, setUsers] = useState<any>([]);
  const [products, setProducts] = useState<Product[]| any>([]);
  const [orders, setOrders] = useState<Order[] | any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const monthlyData = [
    { name: 'Jan', revenue: 4000, orders: 240 },
    { name: 'Feb', revenue: 3000, orders: 198 },
    { name: 'Mar', revenue: 5000, orders: 300 },
    { name: 'Apr', revenue: 4500, orders: 270 },
    { name: 'May', revenue: 6000, orders: 360 },
    { name: 'Jun', revenue: 5500, orders: 330 },
  ];

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    const userRole = loadedUser?.role || 'user';
    try {
      const [usersRes, ordersRes] = await Promise.all([
        (await get(`/v2/admin/users`, {}, userRole )),
        ((await  get(`/v2/admin/orders`, {}, userRole)))
      ]);
      setUsers(usersRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const userRole = loadedUser?.role || 'user';

    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await del(`/v2/admin/users/${userId}`, userRole);
        setUsers(users.filter((user:any) => user._id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleUpdateProduct = async (productId: string, updatedData: Partial<Product>) => {
    const userRole = loadedUser?.role || 'user';
    try {
      const res = await put(`/v2/admin/products/${productId}`, updatedData, userRole);
      setProducts(products.map((product: any) => product._id === productId ? res.data : product));
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    const userRole = loadedUser?.role || 'user';
    try {
      const res = await axios.put(`/v2/admin/orders/${orderId}`, { status: newStatus,
        role: userRole });
      setOrders(orders.map((order:any) => order._id === orderId ? res.data : order));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {loadedUser && loadedUser.role === 'admin' ? (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">Users</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users["users"]?.map((user:any) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{`${user.firstName} ${user.lastName}`}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.phoneNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Products</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product:any) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleUpdateProduct(product._id, { stock: product.stock + 1 })}
                        className="text-green-600 hover:text-green-900 mr-2"
                      >
                        Increase Stock
                      </button>
                      <button
                        onClick={() => handleUpdateProduct(product._id, { stock: Math.max(0, product.stock - 1) })}
                        className="text-red-600 hover:text-red-900"
                      >
                        Decrease Stock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Orders</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
          
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="mx-1 px-4 py-2 bg-gray-200 text-gray-800 rounded"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="mx-1 px-4 py-2 bg-gray-200 text-gray-800 rounded"
            >
              Next
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Revenue" value="$24,000" icon={<DollarSign className="h-8 w-8 text-green-500" />} />
        <StatCard title="Orders" value="1,698" icon={<ShoppingBag className="h-8 w-8 text-blue-500" />} />
        <StatCard title="Avg. Order Value" value="$142" icon={<TrendingUp className="h-8 w-8 text-yellow-500" />} />
        <StatCard title="Products Sold" value="1,234" icon={<Package className="h-8 w-8 text-purple-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Monthly Revenue & Orders</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
              <Bar yAxisId="right" dataKey="orders" fill="#82ca9d" name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Inbox</h2>
          <Inbox />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Latest Orders</h2>
          <LatestOrders />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Latest Transactions</h2>
          <LatestTransactions />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">New Order Form</h2>
        <OrderForm />
      </div>



        </div>
      ) : (
        <p>You do not have permission to view this page.</p>
      )}
    </div>
  );
}