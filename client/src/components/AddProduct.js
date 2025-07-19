// AddProduct.js
import React, { useState } from "react";
import Navbar from "./Utility/Navbar"; // Import your Navbar component
import Footer from "./Utility/Footer"; // Import your Footer component
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    // State to manage form fields
    const [formData, setFormData] = useState({
        name: "",
        category: "other",
        description: "",
        price: "",
        images: [],
        specifications: [],
    });

    // State to manage individual specification input fields
    const [specificationField, setSpecificationField] = useState({
        key: "",
        value: "",
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Add a new specification to the specifications array
    const handleAddSpecification = () => {
        if (specificationField) {
            setFormData({
                ...formData,
                specifications: [...formData.specifications, specificationField],
            });
            setSpecificationField({
                key: "",
                value: "",
            }); // Clear the specification field
        }
    };

    // Remove a specification from the specifications array
    const handleRemoveSpecification = (index) => {
        const updatedSpecifications = [...formData.specifications];
        updatedSpecifications.splice(index, 1);
        setFormData({
            ...formData,
            specifications: updatedSpecifications,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert uploaded images to base64 strings
        const imagePromises = formData.images.map((image) =>
            getBase64(image).catch((error) =>
                console.error("Error converting image:", error)
            )
        );

        // Wait for all images to be converted to base64
        Promise.all(imagePromises)
            .then((base64Images) => {
                // Add the base64 image strings to formData

                // Make the POST request
                fetch(`${process.env.REACT_APP_BASE_URL}/api/products/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...formData,
                        images: base64Images,
                        uploadedBy: {
                            _id: user.id,
                            name: user.name,
                            college: user.college,
                        },
                    }),
                })
                    .then((response) => {
                        if (response.ok) {
                            // Product was successfully added
                            // You can redirect the user or show a success message
                            console.log("Product added successfully!");
                            navigate("/home");
                        } else {
                            // Handle errors, e.g., show an error message to the user
                            console.error("Failed to add product.");
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            })
            .catch((error) => {
                console.error("Error converting images:", error);
            });
    };

    // Function to convert an image file to base64
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="w-4/5 mx-auto py-4">
                <h1 className="text-3xl font-semibold text-gray-900 mb-4">
                    Add New Product
                </h1>
                <form onSubmit={handleSubmit}>
                    {/* Product Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-600">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded-lg py-2 px-3"
                            required
                        />
                    </div>

                    {/* Product Category Dropdown */}
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-600">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border rounded-lg py-2 px-3"
                            required
                        >
                            <option value="other">Other</option>
                            <option value="electronics">Electronics</option>
                            <option value="mattress">Mattress</option>
                            <option value="air cooler">Air Cooler</option>
                            <option value="cycles">Cycles</option>
                            <option value="books">Books</option>
                        </select>
                    </div>

                    {/* Product Description */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-600">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border rounded-lg py-2 px-3"
                            required
                        />
                    </div>

                    {/* Product Price */}
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-600">
                            Price (in ₹)
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full border rounded-lg py-2 px-3"
                            required
                            min="0"
                        />
                    </div>

                    {/* Product Images */}
                    <div className="mb-4">
                        <label htmlFor="images" className="block text-gray-600">
                            Images
                        </label>
                        <input
                            type="file"
                            id="images"
                            name="images"
                            accept="image/*"
                            multiple
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    images: Array.from(e.target.files),
                                })
                            }
                            className="w-full border rounded-lg py-2 px-3"
                            required
                        />
                    </div>

                    {/* Product Specifications (if applicable) */}
                    {/* Product Specifications */}
                    <div className="mb-4">
                        <label htmlFor="specifications" className="block text-gray-600">
                            Specifications
                        </label>
                        {formData.specifications.map((spec, index) => (
                            <div key={index} className="flex mb-2 justify-between">
                                <input
                                    type="text"
                                    name={`specification-${index}-key`}
                                    value={spec.key}
                                    readOnly
                                    className="w-[45%] border rounded-lg py-2 px-3 bg-gray-200 mr-2"
                                    disabled
                                />
                                <input
                                    type="text"
                                    name={`specification-${index}-value`}
                                    value={spec.value}
                                    readOnly
                                    className="w-[45%] border rounded-lg py-2 px-3 bg-gray-200 mr-2"
                                    disabled
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSpecification(index)}
                                    className="w-32 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <div className="flex flex-col md:flex-row justify-between">
                            <input
                                type="text"
                                id="specificationKeyField"
                                name="specificationKeyField"
                                value={specificationField.key}
                                onChange={(e) =>
                                    setSpecificationField({
                                        ...specificationField,
                                        key: e.target.value,
                                    })
                                }
                                className="w-full md:w-[45%] border rounded-lg py-2 px-3 my-2 md:my-0"
                                placeholder="Key"
                            />
                            <input
                                type="text"
                                id="specificationValueField"
                                name="specificationValueField"
                                value={specificationField.value}
                                onChange={(e) =>
                                    setSpecificationField({
                                        ...specificationField,
                                        value: e.target.value,
                                    })
                                }
                                className="w-full md:w-[45%] border rounded-lg py-2 px-3 my-2 md:my-0"
                                placeholder="Value"
                            />
                            <button
                                type="button"
                                onClick={handleAddSpecification}
                                className="w-full md:w-32 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default AddProduct;