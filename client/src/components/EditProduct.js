import React, { useState, useEffect } from "react";
import Navbar from "./Utility/Navbar";
import Footer from "./Utility/Footer";
import { useAuth } from "../context/authContext";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "./EditProduct/ProductForm";

const EditProduct = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
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

    const [imageField, setImageField] = useState(null); // State to manage individual image input field
    const [imageFieldError, setImageFieldError] = useState(""); // State to manage image field error message

    // Handle image file change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageField(file);
        setImageFieldError(""); // Clear any previous error messages
    };

    // Add a new image to the images array after converting it to base64
    const handleAddImage = () => {
        if (imageField) {
            const reader = new FileReader();
            reader.readAsDataURL(imageField);
            reader.onloadend = () => {
                const base64Image = reader.result; // Get the base64 representation of the image
                setFormData({
                    ...formData,
                    images: [...formData.images, base64Image],
                });
                setImageField(""); // Clear the image field
                setImageFieldError(""); // Clear any previous error messages
            };
        } else {
            setImageFieldError("Please select an image file.");
        }
    };

    // Remove an image from the images array
    const handleRemoveImage = (index) => {
        const updatedImages = [...formData.images];
        updatedImages.splice(index, 1);
        setFormData({
            ...formData,
            images: updatedImages,
        });
    };

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
        if (specificationField.key && specificationField.value) {
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

        // Perform client-side validation, for example, ensuring required fields are filled
        if (!formData.name || !formData.description || !formData.price) {
            console.error("Please fill out all required fields.");
            return;
        }

        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/api/products/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...formData,
                        uploadedBy: {
                            _id: user.id,
                            name: user.name,
                            college: user.college,
                        },
                    }),
                }
            );

            if (response.ok) {
                // Product was successfully updated
                console.log("Product updated successfully!");
                navigate(`/product/${id}`); // Redirect to the product details page after update
            } else {
                console.error("Failed to update product.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Fetch product details for editing
    useEffect(() => {
        // Fetch the product details using the id from the URL params
        const fetchProductDetails = async () => {
            try {
                console.log(id);
                const response = await fetch(
                    `${process.env.REACT_APP_BASE_URL}/api/products/${id}`
                ); 
                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        name: data.name,
                        category: data.category,
                        description: data.description,
                        price: data.price.$numberDecimal,
                        images: data.images,
                        specifications: data.specifications,
                    });
                } else {
                    console.error("Failed to fetch product details");
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchProductDetails();
    }, [id]);

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="w-4/5 mx-auto py-4">
                <h1 className="text-3xl font-semibold text-white mb-4">
                    Edit Product
                </h1>
                <ProductForm
                    formData={formData}
                    handleChange={handleChange}
                    handleImageChange={handleImageChange}
                    handleAddImage={handleAddImage}
                    imageFieldError={imageFieldError}
                    handleRemoveImage={handleRemoveImage}
                    specificationField={specificationField}
                    setSpecificationField={setSpecificationField}
                    handleAddSpecification={handleAddSpecification}
                    handleRemoveSpecification={handleRemoveSpecification}
                    handleSubmit={handleSubmit}
                />
            </div>
            <Footer />
        </div>
    );
};

export default EditProduct;