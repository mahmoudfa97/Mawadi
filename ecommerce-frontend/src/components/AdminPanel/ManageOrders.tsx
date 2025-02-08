import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageOrders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL+'/admin/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error(error));
  }, []);

  const updateOrderStatus = (orderId: string, status: string) => {
    axios.patch(process.env.REACT_APP_API_URL+`/admin/orders/${orderId}`, { status })
      .then(() => {
        setOrders(orders.map(order => order._id === orderId ? { ...order, status } : order));
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Manage Orders</h2>
      <ul>
        {orders.map((order: any) => (
          <li key={order._id}>
            Order #{order._id} - Status: {order.status}
            <select onChange={e => updateOrderStatus(order._id, e.target.value)} value={order.status}>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageOrders;
