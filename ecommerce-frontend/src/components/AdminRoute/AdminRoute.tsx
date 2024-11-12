import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { loadedUser, isLoading } = useAuth();
  console.log(loadedUser)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return loadedUser && loadedUser.role === 'admin' ? <>{children}</> : <Navigate to="/login" />;
};

export default AdminRoute;