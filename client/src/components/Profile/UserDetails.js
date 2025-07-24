import React from "react";
import UserField from "./UserField";

const UserDetails = ({ userData, displayEdit, editMode, formData, handleChange, handleEditClick, handleSaveClick, }) => {
    return (
        <div className="w-full md:w-3/4 p-4">
            <form>
                {/* Use UserField component for each field */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="mb-4">
                        <UserField
                            label="Name"
                            name="fullName"
                            value={editMode ? formData.fullName : userData.fullName}
                            onChange={handleChange}
                            editMode={editMode}
                        />
                    </div>
                    <div className="mb-4">
                        <UserField
                            label="Email"
                            name="email"
                            value={editMode ? formData.email : userData.email}
                            onChange={handleChange}
                            editMode={editMode}
                        />
                    </div>
                    <div className="mb-4">
                        <UserField
                            label="Phone No."
                            name="phoneNo"
                            value={editMode ? formData.phoneNo : userData.phoneNo}
                            onChange={handleChange}
                            editMode={editMode}
                        />
                    </div>
                    <div className="mb-4">
                        <UserField
                            label="College"
                            name="college"
                            value={editMode ? formData.college : userData.college}
                            onChange={handleChange}
                            editMode={editMode}
                        />
                    </div>
                    <div className="mb-4">
                        <UserField
                            label="College ID"
                            name="collegeId"
                            value={editMode ? formData.collegeId : userData.collegeId}
                            onChange={handleChange}
                            editMode={editMode}
                        />
                    </div>
                    <div className="mb-4">
                        <UserField
                            label="Address"
                            name="address"
                            value={editMode ? formData.address : userData.address}
                            onChange={handleChange}
                            editMode={editMode}
                        />
                    </div>
                    <div className="mb-4">
                        <UserField
                            label="City"
                            name="city"
                            value={editMode ? formData.city : userData.city}
                            onChange={handleChange}
                            editMode={editMode}
                        />
                    </div>
                    <div className="mb-4">
                        <UserField
                            label="State"
                            name="state"
                            value={editMode ? formData.state : userData.state}
                            onChange={handleChange}
                            editMode={editMode}
                        />
                    </div>
                    <div className="mb-4">
                        <UserField
                            label="Zip Code"
                            name="zipCode"
                            value={editMode ? formData.zipCode : userData.zipCode}
                            onChange={handleChange}
                            editMode={editMode}
                        />
                    </div>
                </div>
            </form>
            {displayEdit && (
                // Show the buttons only when the user is viewing their own profile
                <>
                    {editMode ? (
                        // Edit mode
                        <button
                            type="button"
                            onClick={handleSaveClick}
                            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-800 transition duration-300"
                        >
                            Save
                        </button>
                    ) : (
                        // Read-only mode
                        <button
                            type="button"
                            onClick={handleEditClick}
                            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-800 transition duration-300"
                        >
                            Edit
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default UserDetails;