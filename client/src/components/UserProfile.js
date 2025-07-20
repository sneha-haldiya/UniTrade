import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserDetails from "./Profile/UserDetails";
import { useAuth } from "../context/authContext";
import Navbar from "./Utility/Navbar";
import Footer from "./Utility/Footer";
import ConfirmDialog from "./Profile/ConfirmDialog";
import ProductList from "./Profile/ProductList";
import Loading from "./Utility/Loading";

const UserProfile = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [userProducts, setUserProducts] = useState([]); // State to store user's products
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.id !== id) {
            navigate("/login");
        }
        fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setUserData(data);
                setFormData(data);
            })
            .catch((error) => {
                console.error("Error fetching user data: ", error);
            });

        fetch(`${process.env.REACT_APP_BASE_URL}/api/products/user/${id}`)
            .then((response) => response.json())
            .then((products) => {
                setUserProducts(products);
            })
            .catch((error) => {
                console.error("Error fetching user products: ", error);
            });
    }, [id, user, navigate]);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${id}`, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setUserData(data);
                setEditMode(false);
            })
            .catch((error) => {
                console.error("Error updating user data: ", error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDeleteProduct = (productId) => {
        setProductIdToDelete(productId);
        setShowConfirmation(true);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
        setProductIdToDelete(null);
    };

    const handleConfirmDelete = async () => {
        try {
            if (!productIdToDelete) {
                console.error("Invalid product ID.");
                setShowConfirmation(false);
                return;
            }

            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/api/products/${productIdToDelete}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                setUserProducts((prevProducts) =>
                    prevProducts.filter((product) => product._id !== productIdToDelete)
                );
            } else {
                console.error("Failed to delete the product.");
            }
        } catch (error) {
            console.error("Error deleting product: ", error);
        } finally {
            setShowConfirmation(false);
            setProductIdToDelete(null);
        }
    };

    if (!userData) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="w-4/5 mx-auto py-4">
                <h1 className="text-3xl font-semibold text-gray-900 mb-4">
                    User Profile
                </h1>
                {userData && (
                    <UserDetails
                        userData={userData}
                        displayEdit={user && user.id}
                        editMode={editMode}
                        formData={formData}
                        handleChange={handleChange}
                        handleEditClick={handleEditClick}
                        handleSaveClick={handleSaveClick}
                    />
                )}
                {userProducts && (
                    <ProductList
                        userProducts={userProducts}
                        onDeleteProduct={handleDeleteProduct}
                    />
                )}
                {showConfirmation && (
                    <ConfirmDialog
                        onCancel={handleCancelDelete}
                        onConfirm={handleConfirmDelete}
                    />
                )}
            </div>
            <Footer />
        </div>
    );
};

export default UserProfile;