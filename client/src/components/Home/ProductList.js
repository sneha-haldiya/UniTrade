import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ currentProducts }) => {
  return (
    <div className="w-full p-4">
      <div className="flex flex-wrap">
        {currentProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;