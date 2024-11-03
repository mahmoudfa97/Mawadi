import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage: React.FC = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data.orders);
      } catch (error) {
        alert('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Your Orders</h2>
      <ul>
        {orders.map((order: any) => (
          <li key={order.id}>
            Order #{order.id} - Status: {order.status}, Tracking: {order.tracking}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
