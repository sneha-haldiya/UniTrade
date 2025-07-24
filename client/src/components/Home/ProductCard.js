import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const [clickedButtonId, setClickedButtonId] = useState(null);

    const handleAddToCart = (product) => {
        setClickedButtonId(product._id);
        setTimeout(() => {
            setClickedButtonId(null);
        }, 1000);
        navigate(`/product/${product._id}`);
    };

    return (
        <div className="m-2 flex flex-col justify-between flex-shrink-0 w-64 bg-gray-800 text-white px-4 py-5 rounded-md hover:scale-105 transition-all">
            <a href={`/product/${product._id}`} className="text-blue-500 block ">
                <div
                    className="w-full h-52 mb-2 rounded-md"
                    style={{
                        backgroundImage: `url(${product.images[0]})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                ></div>
            </a>
            <h3 className="text-lg font-semibold mb-1">
                {product.name.length > 40
                    ? `${product.name.slice(0, 40)}...`
                    : product.name}
            </h3>
            <div>
                <p className="text-sm text-gray-300">Uploaded by - {product.uploadedBy.name}</p>
                <p className="text-sm text-gray-300">{product.uploadedBy.college}</p>

                <div className="flex justify-between items-center mt-2">
                    <button
                        className={`flex items-center px-4 py-2 rounded ${clickedButtonId === product._id
                            ? "bg-green-500"
                            : "bg-indigo-600 hover:bg-indigo-800"
                            } text-gray-300 transition duration-300 transform`}
                        onClick={() => handleAddToCart(product)}>
                        <span className={`mr-2 ${clickedButtonId === product._id ? "animate-ping" : ""} transition-transform`}>
                            <FaShoppingCart />
                        </span>
                        Buy now
                    </button>
                    <p className="text-xl mx-auto">
                        ₹{parseFloat(product.price.$numberDecimal).toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
