import React from "react";

const UserField = ({ label, name, value, onChange, editMode }) => {
    return (
        <div className="mb-4">
            <label className="font-semibold">{label}:</label>{" "}
            {editMode ? (
                <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full py-2 px-4 rounded-lg bg-gray-100 border border-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
            ) : (
                <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full py-2 px-4 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    disabled
                />
            )}
        </div>
    );
};

export default UserField;