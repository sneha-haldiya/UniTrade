import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import Navbar from "./Utility/Navbar";
import Footer from "./Utility/Footer";

const OrdersPlaced = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/order/${user.id}`);
      const data = await res.json();
      setOrders(data);
    };

    if (user) fetchOrders();
  }, [user]);

  const getRandomStatus = () => {
    // Simulated delivery status
    const statuses = ["Out for Delivery", "Delivered"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-11/12 md:w-4/5 mx-auto py-6">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Your Orders</h1>
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders placed yet.</p>
        ) : (
          orders.map((order) => {
            const product = order.product;
            const price = parseFloat(product.price.$numberDecimal).toFixed(2);
            const status = getRandomStatus(); 

            return (
              <div
                key={order._id}
                className="flex flex-col md:flex-row items-center bg-gray-800 rounded-lg shadow-md p-4 mb-5 hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-md mb-4 md:mb-0 md:mr-6 border"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white">{product.name}</h2>
                  <p className="text-white mt-1">{product.description}</p>
                  <p className="text-sm text-white mt-1">
                    Category: <span className="capitalize">{product.category}</span>
                  </p>
                  <p className="text-lg font-semibold text-green-600 mt-2">₹{price}</p>
                  <p className="text-sm text-white mt-1">
                    Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                  <div className="mt-3 inline-block px-3 py-1 text-sm rounded-full font-medium 
                      text-white
                      bg-gradient-to-r from-blue-500 to-purple-500">
                    {status}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrdersPlaced;