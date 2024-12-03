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
import ProductList from "./components/AdminPanel/components/ProductList";
import AdminDashboard from "./components/AdminPanel/adminDashboard";
import CreateProduct from "./components/AdminPanel/components/CreateProduct";
import EditProduct from "./components/AdminPanel/components/EditProduct";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <AdminLayout>
                  {" "}
                  <ProductList />
                </AdminLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products/create"
            element={
              <AdminRoute>
                <AdminLayout>
                  {" "}
                  <CreateProduct />
                </AdminLayout>
              </AdminRoute>
            }
          />
            <Route
            path="/admin/products/edit"
            element={
              <AdminRoute>
                <AdminLayout>
                  {" "}
                </AdminLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          ></Route>
           
          {/* Catch-all Redirect to Home */}
        </Routes>
        <Header />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
