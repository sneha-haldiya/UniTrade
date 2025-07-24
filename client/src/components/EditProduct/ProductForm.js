import React from "react";

const ProductForm = ({
    formData,
    handleChange,
    handleImageChange,
    handleAddImage,
    imageFieldError,
    handleRemoveImage,
    specificationField,
    setSpecificationField,
    handleAddSpecification,
    handleRemoveSpecification,
    handleSubmit,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            {/* Product Name */}
            <div className="mb-4">
                <label htmlFor="name" className="block text-white">
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
                <label htmlFor="category" className="block text-white">
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
                <label htmlFor="description" className="block text-white">
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
                <label htmlFor="price" className="block text-white">
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
                <label htmlFor="images" className="block text-white">
                    Images
                </label>
                <input
                    type="file"
                    id="images"
                    name="images"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border rounded-lg py-2 px-3"
                />
                <button
                    type="button"
                    onClick={handleAddImage}
                    className="mt-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                >
                    Add Image
                </button>
                {imageFieldError && <p className="text-red-500">{imageFieldError}</p>}
                {formData.images.length > 0 && (
                    <div className="mt-4">
                        {formData.images.map((image, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <img
                                    src={image}
                                    alt={`Product Image ${index + 1}`}
                                    className="w-32 h-32 object-cover rounded-lg mr-3"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 transition duration-300"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Product Specifications (if applicable) */}
            <div className="mb-4">
                <label htmlFor="specifications" className="block text-white">
                    Specifications
                </label>
                {formData.specifications.map((spec, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row justify-between"
                    >
                        <input
                            type="text"
                            name={`specification-${index}-key`}
                            value={spec.key}
                            readOnly
                            className="w-full md:w-[45%] border rounded-lg py-2 px-3 my-2 md:my-0"
                            disabled
                        />
                        <input
                            type="text"
                            name={`specification-${index}-value`}
                            value={spec.value}
                            readOnly
                            className="w-full md:w-[45%] border rounded-lg py-2 px-3 my-2 md:my-0"
                            disabled
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveSpecification(index)}
                            className="w-full md:w-32 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition duration-300"
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
                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
};

export default ProductForm;