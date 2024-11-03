import React from 'react';
import ManageProducts from '../Product/ManageProducts';
import ManageUsers from './ManageUsers';
import ManageOrders from './ManageOrders';

const AdminPanel: React.FC = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <ManageProducts />
      <ManageUsers />
      <ManageOrders />
    </div>
  );
};

export default AdminPanel;
