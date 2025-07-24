import React from "react";

const ConfirmDialog = ({ onCancel, onConfirm }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-50 bg-gray-900 transition-opacity duration-300">
            <div className="bg-slate-800 p-8 rounded shadow-md text-gray-800 transform scale-100 hover:scale-105 transition-transform duration-300">
                <p className="text-gray-700 mb-4">Are you sure you want to delete this product?</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onCancel}
                        className="text-indigo-400 font-semibold hover:text-yellow-600 transition-colors duration-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="text-red-500 font-semibold hover:text-red-600 transition-colors duration-300"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;