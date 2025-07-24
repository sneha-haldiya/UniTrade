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

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="w-4/5 mx-auto py-4">
        <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>
        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="p-4 bg-white shadow rounded mb-4">
              <h2 className="text-lg font-bold">{order.product.name}</h2>
              <p>₹{parseFloat(order.product.price.$numberDecimal).toFixed(2)}</p>
            </div>
          ))
        )}

      </div>
      <Footer />
    </div>
  );
};

export default OrdersPlaced;