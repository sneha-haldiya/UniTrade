import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-right p-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between align-middle">
          <div className="md:w-1/4 text-center md:text-left">
            <h2 className="text-xl font-bold">
              UniTrade
            </h2>
            <p>Connecting Students, Empowering Deals!</p>
          </div>
          <div className="w-full md:w-3/4 grid grid-cols-2 text-center md:text-right md:flex md:flex-row justify-between mt-4 md:mt-0">
            <div className="md:w-1/4 my-2 md:my-0">
              <h3 className="text-lg font-semibold">Product</h3>
              <ul className="text-gray-300">
                <li>Overview</li>
                <li>Features</li>
                <li>Pricing</li>
                <li>Releases</li>
              </ul>
            </div>
            <div className="md:w-1/4 my-2 md:my-0">
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="text-gray-300">
                <li>About</li>
                <li>Careers</li>
                <li>News</li>
                <li>Support</li>
              </ul>
            </div>
            <div className="md:w-1/4 my-2 md:my-0">
              <h3 className="text-lg font-semibold">Social</h3>
              <ul className="text-gray-300">
                <li>LinkedIn</li>
                <li>GitHub</li>
                <li>Twitter</li>
                <li>Instagram</li>
              </ul>
            </div>
            <div className="md:w-1/4 my-2 md:my-0">
              <h3 className="text-lg font-semibold">Legal</h3>
              <ul className="text-gray-300">
                <li>Terms</li>
                <li>Privacy</li>
                <li>Licenses</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="border-gray-800 my-8" />
        <div className="text-gray-300 text-center">
          &copy; {new Date().getFullYear()} UniTrade. All rights reserved.
          Designed and developed by - Sneha Haldiya & Simran Behera
        </div>
      </div>
    </footer>
  );
};

export default Footer;