import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import Loading from "../Utility/Loading";

const ProductsList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/api/products/`
            );
            if (response.ok) {
                const products = await response.json();
                setFilteredProducts(products);
                setIsLoading(false);
            } else {
                console.error("Failed to fetch products");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const currentPage = 1;
    const productsPerPage = 20;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );


    return (
        <div className="lg:w-4/5 mx-4 md:mx-auto py-4">
            <h1 className="text-3xl font-semibold mb-4">All Products</h1>
            <div>
                {!isLoading ? (
                    <div className="flex flex-col md:flex-row">
                        <div>filters to be added later</div>
                        <div className="w-full flex flex-col items-center">
                            <ProductList currentProducts={currentProducts} />
                            <div>pagination to be added later</div>
                        </div>
                    </div>
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
};

export default ProductsList;