import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const LandingPage = () => {
    return (
        <div
            className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center px-4 text-white"
            style={{
                backgroundImage: `url(https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                backgroundBlendMode: "overlay",
            }}>
            <div className="text-center">
                <h1 className="text-[10vh] font-extrabold text-yellow-400 tracking-wide drop-shadow-lg">
                    UniTrade
                </h1>
                <p className="text-xl md:text-2xl mt-4 max-w-2xl mx-auto text-gray-100 leading-relaxed">
                    A student-to-student marketplace to buy and sell essentials like cycles,
                    books, mattresses, and more — all within your campus.
                </p>

                <div className="mt-10 space-y-4 flex flex-col items-center">
                    <Link
                        to="/register"
                        className="bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white font-semibold px-6 py-3 rounded-full flex items-center transition-all duration-300"
                    >
                        Join Now <FaArrowRight className="ml-2" />
                    </Link>
                    <Link
                        to="/home"
                        className="text-white hover:text-yellow-400 font-medium transition-all"
                    >
                        Browse Listings
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
