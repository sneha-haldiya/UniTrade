import React from "react";

const FormField = ({ label, name, type, value, onChange, error }) => {
    return (
        <div className="mb-4">
            <label className="block text-white text-sm mb-2">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 ${error ? "border-red-500" : ""
                    }`}
                placeholder={label}
                required
            />
            {error && (
                <p className="text-red-500 text-xs mt-1">This field is required</p>
            )}
        </div>
    );
};

export default FormField;