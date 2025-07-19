import React from "react";
import Navbar from "./Utility/Navbar";
import Footer from "./Utility/Footer";
import ProductsList from "./Home/index";

const Home = () => {
  return (
    <div>
      <Navbar />
      <ProductsList />
      <Footer />
    </div>
  );
};

export default Home;