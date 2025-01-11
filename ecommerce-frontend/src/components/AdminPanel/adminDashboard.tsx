import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { del, get, put } from '../../services/api';
import { User } from "lucide-react";

import StatCard from "./components/StatCard";
import Performance from "./components/Performance";
import TopPages from "./components/topPages";
import CountryAnalytics from "./components/Countries";
import Conversions from "./components/Conversions";

import AdminLayout from './AdminLayout';
import ProductList from './components/ProductList';

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
    <AdminLayout>
        {/* Alert Banner - if error show alert from componenet.alert */}
          

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          <StatCard
            icon={
              <div className="bg-orange-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            }
            title={"Total Orders"}
            value={"13,647"}
            interval={"Week"}
            trend={"↑"}
            data={"2.3"}
          />
          <StatCard
            icon={
              <div className="bg-orange-100 p-3 rounded-lg">
                <User className="w-6 h-6 text-orange-500" />
              </div>
            }
            title={"New Leads"}
            value={"9,526"}
            interval={"Month"}
            trend={"↑"}
            data={"8.1"}
          />
          <StatCard
            icon={
              <div className="bg-orange-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            }
            title={"Deals"}
            value={"976"}
            interval={"Month"}
            trend={"↓"}
            data={"0.3"}
          />
          <StatCard
            icon={
              <div className="bg-orange-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            }
            title={"Booked Revenue"}
            value={"$123.6k"}
            interval={"Month"}
            trend={"↓"}
            data={"10.6"}
          />
        </div>

        {/* Performance Chart */}
            <Performance />

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Conversions */}
          <Conversions />


          {/* Sessions by Country */}
          <CountryAnalytics />

          {/* Top Pages */}
            <TopPages />
        </div>
      <ProductList />
    </AdminLayout>
  );
}