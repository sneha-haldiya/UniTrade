import React from "react";

const Pagination = ({ filteredProducts, productsPerPage, currentPage, paginate, }) => {
    const pageNumbers = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div className="flex justify-center w-full md:w-3/4 p-4">
            <ul className="flex">
                {Array.from({ length: pageNumbers }).map((_, index) => (
                    <li key={index}>
                        <button
                            className={`px-3 py-2 mx-1 rounded-lg bg-gray-900 text-white ${currentPage === index + 1 ? "bg-indigo-600" : ""}`}
                            onClick={() => paginate(index + 1)}>
                            {index + 1}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;