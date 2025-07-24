import React from "react";
import Navbar from "./Utility/Navbar";
import Footer from "./Utility/Footer";
import ProductsList from "./Home/index";

const Home = () => {
  return (
    <div className=" bg-slate-100">
      <Navbar />
      <ProductsList />
      <Footer />
    </div>
  );
};

export default Home;