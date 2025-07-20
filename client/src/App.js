import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Register from "./components/Register";
import Login from "./components/Login";
import LandingPage from "./components/Landing";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import ProductPage from "./components/ProductPage";
import UserProfile from "./components/UserProfile";
import EditProduct from "./components/EditProduct";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/product/:id/edit" element={<EditProduct />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;