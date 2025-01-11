import React, { useEffect } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Navbar/NavBar";
import Footer from "./components/Footer/footer";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import AdminLayout from "./components/AdminPanel/AdminLayout";
import ProductList from "./components/AdminPanel/pages/ProductListPage";
import AdminDashboard from "./components/AdminPanel/adminDashboard";
import CreateProduct from "./components/AdminPanel/pages/CreateProductPage";
import EditProduct from "./components/AdminPanel/components/EditProduct";

const App: React.FC = () => {
  return (
    <AuthProvider>
    <Router>
      <AppRoutes />
    </Router>
  </AuthProvider>
  );
};

export default App;
