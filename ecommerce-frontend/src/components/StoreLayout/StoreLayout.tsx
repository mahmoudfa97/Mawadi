import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Navbar/NavBar";
import Footer from "../Footer/footer";

const StoreLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="w-full px-5 main-header xl:w-[92%] mx-auto pt-0 md:pt-5">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default StoreLayout;

