import React, { useState } from "react";

const Filters = ({
    searchQuery,
    handleSearchQueryChange,
    collegeQuery,
    handleCollegeQueryChange,
    collegeOptions,
    sortBy,
    handleSortChange,
    priceRange,
    handlePriceRangeChange,
    categoryFilter,
    handleCategoryFilterChange,
    handleFiltersApplied,
}) => {
    const [showFilters, setShowFilters] = useState(false);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleApplyFilters = () => {
        // Pass the filter criteria to the parent component
        // You can define the filter criteria as an object and pass it to a function like handleFiltersApplied(criteria)
        const filterCriteria = {
            searchQuery,
            collegeQuery,
            sortBy,
            priceRange,
            categoryFilter,
        };
        // Call the function to apply filters in the parent component
        handleFiltersApplied(filterCriteria);
    };

    const filtersClass = `${showFilters ? "block" : "hidden"} md:block`;

    const filteredCollegeOptions = collegeOptions.filter((college) =>
        college.toLowerCase().includes(collegeQuery.toLowerCase())
    );

    return (
        <div className="md:w-1/3 lg:w-1/4 p-4 ">
            <h2 className="text-right font-semibold mb-4 md:hidden">
                <button
                    onClick={toggleFilters}
                    className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900 transition-all"
                >
                    Filters
                </button>
            </h2>
            <div className={filtersClass}>
                <div className="mb-4">
                    <label className="text-gray-600 block mb-2">Search:</label>
                    <input
                        type="text"
                        className="bg-gray-800 text-white p-2 w-full border-2 border-transparent focus:border-white"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="text-gray-600 block mb-2">College:</label>
                    <input
                        type="text"
                        className="bg-gray-800 text-white p-2 w-full border-2 border-transparent focus:border-white"
                        placeholder="Search College..."
                        value={collegeQuery}
                        onChange={handleCollegeQueryChange}
                    />
                    <select
                        value={collegeQuery}
                        onChange={handleCollegeQueryChange}
                        className="p-2 rounded bg-gray-800 text-white w-full mt-2"
                    >
                        {filteredCollegeOptions.map((college) => (
                            <option key={college} value={college}>
                                {college}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="text-gray-600 block mb-2">Sort By:</label>
                    <select
                        value={sortBy}
                        onChange={handleSortChange}
                        className="p-2 rounded bg-gray-800 text-white w-full"
                    >
                        <option value="latest">Latest</option>
                        <option value="lowestPrice">Lowest Price</option>
                        <option value="highestPrice">Highest Price</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="text-gray-600 block mb-2">Category:</label>
                    <select
                        value={categoryFilter}
                        onChange={handleCategoryFilterChange}
                        className="p-2 rounded bg-gray-800 text-white w-full"
                    >
                        <option value="">All</option>
                        <option value="electronics">Electronics</option>
                        <option value="mattress">Mattress</option>
                        <option value="air cooler">Air Cooler</option>
                        <option value="cycles">Cycles</option>
                        <option value="books">Books</option>
                        <option value="books">Calculator</option>
                        <option value="books">Study Table</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="text-gray-600 block mb-2">Price Range:</label>
                    <input
                        type="range"
                        min={0}
                        max={10000}
                        value={priceRange[0]}
                        onChange={(e) =>
                            handlePriceRangeChange(+e.target.value, priceRange[1])
                        }
                        className="mr-2 w-full bg-gray-900"
                    />
                    <input
                        type="range"
                        min={0}
                        max={10000}
                        value={priceRange[1]}
                        onChange={(e) =>
                            handlePriceRangeChange(priceRange[0], +e.target.value)
                        }
                        className="ml-2 w-full bg-gray-900"
                    />
                    <div className="flex justify-between">
                        <span className="text-gray-600">{priceRange[0]}</span>
                        <span className="text-gray-600">{priceRange[1]}</span>
                    </div>
                </div>
                <div className="mb-4">
                    <button
                        onClick={handleApplyFilters}
                        className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900 transition-all"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Filters;