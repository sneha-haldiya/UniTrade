import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    college: "",
    collegeId: "",
    phoneNo: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    fullName: "",
    college: "",
    collegeId: "",
    phoneNo: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
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

    // Validate the form
    const errors = {};
    let isValid = true;

    // Check for empty fields
    for (const field in formData) {
      if (formData[field] === "") {
        errors[field] = "This field is required";
        isValid = false;
      }
    }

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    // Send a POST request to register the user
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/users/register`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      // Redirect to the login page after successful registration
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg sm:w-96 md:w-2/3">
        <h1 className="text-3xl font-semibold text-white mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 pr-0 md:pr-2">
              <div className="mb-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full py-2 px-4 rounded-lg bg-slate-700 border ${
                    formErrors.fullName ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                />
                {formErrors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.fullName}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full py-2 px-4 rounded-lg bg-slate-700 border ${
                    formErrors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full py-2 px-4 rounded-lg bg-slate-700 border ${
                    formErrors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                />
                {formErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.password}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="college"
                  placeholder="College"
                  value={formData.college}
                  onChange={handleChange}
                  className={`w-full py-2 px-4 rounded-lg bg-slate-700 border ${
                    formErrors.college ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                />
                {formErrors.college && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.college}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="collegeId"
                  placeholder="College ID"
                  value={formData.collegeId}
                  onChange={handleChange}
                  className={`w-full py-2 px-4 rounded-lg bg-slate-700 border ${
                    formErrors.collegeId ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                />
                {formErrors.collegeId && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.collegeId}
                  </p>
                )}
              </div>
            </div>
            <div className="md:w-1/2 pr-0 md:pr-2">
              <div className="mb-4">
                <input
                  type="text"
                  name="phoneNo"
                  placeholder="Phone Number"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  className={`w-full py-2 px-4 rounded-lg bg-slate-700 border ${
                    formErrors.phoneNo ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                />
                {formErrors.phoneNo && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.phoneNo}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full py-2 px-4 rounded-lg bg-slate-700 border ${
                    formErrors.address ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                />
                {formErrors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.address}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full py-2 px-4 rounded-lg bg-slate-700 border ${
                    formErrors.city ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                />
                {formErrors.city && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className={`w-full py-2 px-4 rounded-lg bg-slate-700 border ${
                    formErrors.state ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                />
                {formErrors.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.state}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Zip Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className={`w-full py-2 px-4 rounded-lg bg-slate-700 border ${
                    formErrors.zipCode ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent`}
                />
                {formErrors.zipCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.zipCode}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 px-4	bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-gray-500 mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-400 hover:text-white">
            Login here
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;