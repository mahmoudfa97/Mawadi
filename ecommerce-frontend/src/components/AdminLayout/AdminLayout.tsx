import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Navbar/NavBar";
import Footer from "../Footer/footer";
import AdminRoute from "../AdminRoute/AdminRoute";

const StoreLayout: React.FC = () => {
  return (
    <>
      <AdminRoute>
        <Outlet />
      </AdminRoute>
    </>
  );
};

export default StoreLayout;

