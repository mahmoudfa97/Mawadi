import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Navbar/NavBar";
import Footer from "./components/Footer/footer";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
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
