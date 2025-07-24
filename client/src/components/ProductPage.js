import React from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "./ProductDetails/ProductDetails";
import Navbar from "./Utility/Navbar";
import Footer from "./Utility/Footer";

const ProductPage = () => {
    const { id } = useParams();
    return (
        <div>
            <Navbar />
            <div className="mx-auto w-full md:w-4/5 p-4 ">
                <h1 className="text-3xl font-semibold text-white">Product Details</h1>
                {id && <ProductDetails productId={id} />}{" "}
            </div>
            <Footer />
        </div>
    );
};

export default ProductPage;