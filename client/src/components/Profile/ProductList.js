import React from "react";
import { Link } from "react-router-dom";

const ProductList = ({ userProducts, onDeleteProduct }) => {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">My Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {userProducts.map((product) => (
                    <div
                        key={product._id}
                        to={`/product/${product._id}`}
                        className="bg-slate-700 p-4 rounded-lg shadow-2xl border-t-4 border-l-4 border-yellow-500 relative flex flex-col justify-between"
                    >
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                onDeleteProduct(product._id);
                            }}
                            className="absolute top-2 right-2 z-10 text-red-500 cursor-pointer rounded-full border-2 border-red-500 hover:bg-red-500 hover:text-white transition duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <div className="relative">
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-64 object-cover mb-4 rounded-lg"
                            />
                            <h2 className="text-lg font-semibold text-white mb-2">
                                {product.name}
                            </h2>
                            <p className="text-white mb-2">
                                {product.description.length > 100
                                    ? `${product.description.slice(0, 100)}...`
                                    : product.description}
                            </p>
                            <p className="text-indigo-300 text-lg font-semibold mb-2">
                                ₹{parseFloat(product.price.$numberDecimal).toFixed(2)}
                            </p>
                        </div>
                        <span className="text-white py-1 rounded">
                            Uploaded on - {new Date(product.createdAt).toLocaleDateString()}
                        </span>
                        <Link
                            to={`/product/${product._id}`}
                            className="bg-indigo-600 text-white text-center py-2 rounded hover:bg-indigo-800 transition duration-300"
                        >
                            View Product
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;