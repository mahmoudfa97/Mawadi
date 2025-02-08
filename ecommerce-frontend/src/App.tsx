import React, { useEffect } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Navbar/NavBar";
import Footer from "./components/Footer/footer";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SpeedInsights } from "@vercel/speed-insights/react"
const App: React.FC = () => {
  return (
    <AuthProvider>
    <Router>
      <AppRoutes />
      <SpeedInsights />
    </Router>
  </AuthProvider>
  );
};

export default App;
