import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Register from "./components/Register";
import Login from "./components/Login";
import LandingPage from "./components/Landing";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;