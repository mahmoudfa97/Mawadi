import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import Home from "./Pages/Home"; // Home component
import AdminPanel from "./components/AdminPanel/AdminPanel"; // Admin panel component
import ManageProducts from "./components/Product/ManageProducts"; // Manage products component
import ManageUsers from "./components/AdminPanel/ManageUsers"; // Manage users component
import ManageOrders from "./components/AdminPanel/ManageOrders"; // Manage orders component
import AdminNavBar from "./components/AdminPanel/AdminNavBar"; // Navbar for admin navigation
import CategoriesPage from "./Pages/CategoriesPage";
import Header from "./components/Navbar/NavBar";
import Footer from "./components/Footer/footer";
import OccasionsPage from "./Pages/OccasionsPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import PayPalWrapper from "./lib/paypal";
import ProductCategoryPage from "./Pages/ProductCategoryPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import { AuthProvider } from "./components/context/AuthContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Profile from "./components/Profile/ProfilePage";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import DataDeletion from "./components/DataDeletion/DataDeletion";
import Privacy from "./components/Privacy/Privacy";
import Terms from "./components/Terms/Terms";
import AdminDashboard from "./components/AdminPanel/adminDashboard";

const isAdminLoggedIn = () => false;
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div>
          {isAdminLoggedIn() && <AdminNavBar />} {/* Show Navbar if admin is logged in */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs/>} />
            <Route path="/contact-us" element={<ContactUs/>} />
            <Route path="/terms" element={<Terms/>} />
            <Route path="/privacy" element={<Privacy/>} />
            <Route path="/data-deletion" element={<DataDeletion/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/myprofile" element={<Profile />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>}>
              <Route index element={<AdminPanel />} />
              <Route path="products" element={<ManageProducts />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="orders" element={<ManageOrders />} />
            </Route>
            {/* Catch-all Redirect to Home */}
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:name" element={<ProductCategoryPage />} />
            <Route path="/mawadda-tree" element={<CategoriesPage />} />
            <Route path="/bestsellers" element={<ProductCategoryPage />} />
            <Route path="/occasions" element={<OccasionsPage />} />
            <Route path="/productlisting/:name" element={<ProductCategoryPage />} />
            <Route path="/products/:name" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/checkout"
              element={
                <PayPalWrapper>
                  <CheckoutPage />
                </PayPalWrapper>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
