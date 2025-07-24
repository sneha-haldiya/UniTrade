import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      const userId = user ? user.id : null;
      const queryParams = new URLSearchParams(location.search);
      const productId = queryParams.get("productId");

      if (!productId || !userId) return;
      try {
        const res = await fetch("http://localhost:5000/api/payment/success", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId, userId }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error("Server error:", errorData.error);
        }
      } catch (err) {
        console.error("Failed to record payment success", err);
      }
    };
    handlePaymentSuccess();
    const timeout = setTimeout(() => {
      navigate("/home");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [user]);

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4 text-gray-700">Your order has been placed. Redirecting to home...</p>
    </div>
  );
};

export default PaymentSuccess;
