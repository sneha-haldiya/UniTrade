import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/authContext";
import DrawerMenu from "./DrawerMenu";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { isAuthenticated, user, logout } = useAuth();

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <nav className="bg-gray-900 py-4 px-4 md:px-8 md:py-6 flex justify-between items-center z-10">
            <div className="flex items-center">
                <Link to="/home" className="text-white text-3xl font-bold">
                    UniTrade
                </Link>
            </div>
            <div className="relative group">
                {isAuthenticated ? (
                    <>
                        <button
                            onClick={handleDrawerToggle}
                            className="flex items-center space-x-2 focus:outline-none relative border-2 border-white hover:border-gray-900 p-2 rounded-full hover:bg-yellow-500 text-white hover:text-gray-900 transition-all duration-200"
                        >
                            <FaUser className="text-2xl cursor-pointer rounded-full" />
                        </button>
                        <DrawerMenu
                            isOpen={isDrawerOpen}
                            onClose={() => setIsDrawerOpen(false)}
                            user={user}
                            logout={logout}
                        />
                    </>
                ) : (
                    <Link
                        to="/login"
                        className="text-white text-xl hover:text-yellow-500 transition duration-300 p-2"
                    >
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;