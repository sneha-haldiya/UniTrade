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
                    className="w-full py-2 px-4 text-white rounded-lg bg-gray-600 border border-gray-900 focus:border-transparent focus:outline-none "
                />
            ) : (
                <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full py-2 px-4 text-white rounded-lg bg-gray-600 border border-gray-300 focus:outline-none focus:border-transparent"
                    disabled
                />
            )}
        </div>
    );
};

export default UserField;