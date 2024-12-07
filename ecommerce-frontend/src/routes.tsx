import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import AboutUs from "./components/AboutUs/AboutUs";
import AdminDashboard from "./components/AdminPanel/adminDashboard";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import ManageOrders from "./components/AdminPanel/ManageOrders";
import ManageUsers from "./components/AdminPanel/ManageUsers";
import ContactUs from "./components/ContactUs/ContactUs";
import DataDeletion from "./components/DataDeletion/DataDeletion";
import Privacy from "./components/Privacy/Privacy";
import Profile from "./components/Profile/ProfilePage";
import ManageProducts from "./components/Product/ManageProducts";
import Terms from "./components/Terms/Terms";
import PayPalWrapper from "./lib/paypal";
import CartPage from "./Pages/CartPage";
import CategoriesPage from "./Pages/CategoriesPage";
import CheckoutPage from "./Pages/CheckoutPage";
import LoginPage from "./Pages/LoginPage";
import OccasionsPage from "./Pages/OccasionsPage";
import ProductCategoryPage from "./Pages/ProductCategoryPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import RegisterPage from "./Pages/RegisterPage";
import Home from "./Pages/Home";
import FAQ from "./Pages/Faq";
import MawadiMagic from "./Pages/MawadiMagic";
import ProductList from "./components/AdminPanel/components/ProductList";
import CreateProduct from "./components/AdminPanel/components/CreateProduct";
import EditProduct from "./components/AdminPanel/components/EditProduct";
import StoreLayout from "./components/StoreLayout/StoreLayout";
import AdminLayout from "./components/AdminLayout/AdminLayout";

const AppRoutes: React.FC = () => (
  <Routes>
    {/* Admin Routes */}
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboard />} />
      <Route path="products" element={<ProductList />} />
      <Route path="products/create" element={<CreateProduct />} />
      <Route path="orders" element={<ManageOrders />} />
      <Route path="users" element={<ManageUsers />} />
    </Route>

    {/* Store Routes */}
    <Route path="/" element={<StoreLayout />}>
      <Route index element={<Home />} />
      <Route path="about-us" element={<AboutUs />} />
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="terms" element={<Terms />} />
      <Route path="privacy" element={<Privacy />} />
      <Route path="faq" element={<FAQ />} />
      <Route path="data-deletion" element={<DataDeletion />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="myprofile" element={<Profile />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="categories" element={<CategoriesPage />} />
      <Route path="mawaddi-magic" element={<MawadiMagic />} />
      <Route path="bestsellers" element={<ProductCategoryPage />} />
      <Route path="occasions" element={<OccasionsPage />} />
      <Route path="productlisting/:name" element={<ProductCategoryPage />} />
      <Route path="products/:name" element={<ProductDetailsPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route
        path="checkout"
        element={
          <PayPalWrapper>
            <CheckoutPage />
          </PayPalWrapper>
        }
      />
    </Route>

    {/* Catch-all route */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
