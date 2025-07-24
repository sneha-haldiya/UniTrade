import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send a POST request to log in the user
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/users/login`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      const data = await response.json();
      login({
        id: data.user._id,
        name: data.user.fullName,
        college: data.user.college,
      });
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg sm:w-96 md:w-1/2">
        <h1 className="text-3xl font-semibold text-white mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-2 px-4 rounded-lg text-white bg-slate-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full py-2 px-4 rounded-lg text-white bg-slate-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-gray-500 mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-indigo-400 hover:text-white">
            Register here
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;