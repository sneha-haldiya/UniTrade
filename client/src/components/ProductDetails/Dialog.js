import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import FormField from "./FormField";

const Dialog = ({ isOpen, onClose, onSave, id }) => {
    const [formData, setFormData] = useState({ fullName: "", email: "", college: "", phoneNo: "", address: "", city: "", state: "", zipCode: "", });
    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: value.trim() === "" });
    };

    const handleSave = () => {
        const isFormValid = Object.values(formErrors).every((error) => !error);

        if (isFormValid) {
            onSave(formData);
        } else {
            console.error("Please fill out all required fields.");
        }
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_BASE_URL}/api/users/${id}`
                );
                if (response.ok) {
                    const userData = await response.json();
                    setFormData({
                        fullName: userData.fullName || "",
                        email: userData.email || "",
                        college: userData.college || "",
                        phoneNo: userData.phoneNo || "",
                        address: userData.address || "",
                        city: userData.city || "",
                        state: userData.state || "",
                        zipCode: userData.zipCode || "",
                    });
                } else {
                    console.error("Failed to fetch user details");
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserDetails();
    }, [id]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="dialog-overlay bg-gray-800 opacity-50 absolute inset-0"></div>
            <div className="dialog-content bg-slate-800 p-8 rounded-lg shadow-lg z-50 w-full md:w-1/2">
                <button
                    className="absolute top-2 right-2 text-gray-700"
                    onClick={onClose}
                >
                    <FaTimes />
                </button>
                <h2 className="text-2xl font-semibold mb-4">Update Your Details</h2>
                <form className="dialog-form">
                    <div className="flex flex-col md:flex-row w-full justify-between">
                        <div className="w-full md:w-1/2 mr-1">
                            <FormField
                                label="Name"
                                name="fullName"
                                type="text"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                error={formErrors.fullName}
                            />
                            <FormField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                error={formErrors.email}
                            />
                            <FormField
                                label="College"
                                name="college"
                                type="text"
                                value={formData.college}
                                onChange={handleInputChange}
                                error={formErrors.college}
                            />
                            <FormField
                                label="Phone Number"
                                name="phoneNo"
                                type="tel"
                                value={formData.phoneNo}
                                onChange={handleInputChange}
                                error={formErrors.phoneNo}
                            />
                        </div>
                        <div className="w-full md:w-1/2 ml-1">
                            <FormField
                                label="Address"
                                name="address"
                                type="text"
                                value={formData.address}
                                onChange={handleInputChange}
                                error={formErrors.address}
                            />
                            <FormField
                                label="City"
                                name="city"
                                type="text"
                                value={formData.city}
                                onChange={handleInputChange}
                                error={formErrors.city}
                            />
                            <FormField
                                label="State"
                                name="state"
                                type="text"
                                value={formData.state}
                                onChange={handleInputChange}
                                error={formErrors.state}
                            />
                            <FormField
                                label="Zip Code"
                                name="zipCode"
                                type="text"
                                value={formData.zipCode}
                                onChange={handleInputChange}
                                error={formErrors.zipCode}
                            />
                        </div>
                    </div>
                    <div className="flex justify-around">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-1/3 md:w-1/4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-800 transition duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="w-1/3 md:w-1/4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition duration-300"
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Dialog;