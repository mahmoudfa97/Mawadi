import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {

  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Clear token
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/admin">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/products">Manage Products</Link>
        </li>
        <li>
          <Link to="/admin/users">Manage Users</Link>
        </li>
        <li>
          <Link to="/admin/orders">Manage Orders</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
