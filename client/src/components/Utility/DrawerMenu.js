import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
/* import { FaShoppingCart } from "react-icons/fa"; */

const DrawerMenu = ({ isOpen, onClose, user, logout }) => {
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto"; // Restore scrolling when menu is closed
    }

    return () => {
      document.body.style.overflow = "auto"; // Ensure scrolling is restored on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={menuRef}
      className={`${isOpen ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 h-full w-64 bg-gradient-to-l from-gray-900 to-gray-800 z-50 transition-transform duration-300 ease-in-out`}
    >
      <div className="p-4 text-lg">
        <Link
          to={`/profile/${user.id}`}
          className="block text-gray-200 hover:text-indigo-300 py-2 transition duration-300"
        >
          Profile
        </Link>
        <Link
          to={`/home`}
          className="block text-gray-200 hover:text-indigo-300 py-2 transition duration-300"
        >
          Home
        </Link>
        <Link
          to="/add-product"
          className="block text-gray-200 hover:text-indigo-300 py-2 transition duration-300"
        >
          Add Product
        </Link>
        <Link
          to="/view-product"
          className="block text-gray-200 hover:text-indigo-300 py-2 transition duration-300 "
        >
         {/*  <span className={`mr-2`}><FaShoppingCart /></span> */}
          Orders Placed
        </Link>
        <button
          onClick={() => {
            logout();
            onClose(); // Close the drawer when the user clicks Sign Out
            navigate("/home");
          }}
          className="block text-gray-200 hover:text-indigo-300 py-2 w-full text-left transition duration-300"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default DrawerMenu;