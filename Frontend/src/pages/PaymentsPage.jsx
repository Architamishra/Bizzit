import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const PaymentsPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const distributorId = localStorage.getItem("register1");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!distributorId) {
        setError("Distributor ID is not available.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3300/api/distributor/orderView?distributorId=${distributorId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [distributorId]);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  const sortedOrders = orders.sort((a, b) => {
    if (a.paymentStatus === "Pending" && b.paymentStatus !== "Pending") {
      return -1;
    }
    if (a.paymentStatus !== "Pending" && b.paymentStatus === "Pending") {
      return 1;
    }
    return 0;
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 mt-20 ml-60">
        <Header />
        <h1 className="text-3xl font-bold mb-4">Payments Page</h1>

        {/* Orders Section */}

        {sortedOrders.length === 0 ? (
          <p className="text-gray-500">No orders found for this distributor.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedOrders.map((order) => (
              <div
                className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105"
                key={order._id}
              >
                <h3 className="text-lg font-bold">
                  {order.productId.productName}
                </h3>
                <p className="mt-2">
                  <strong>Retailer Name:</strong> {order.retailerName}
                </p>
                <p className="mt-1">
                  <strong>Quantity:</strong> {order.quantity}
                </p>
                <p className="mt-1">
                  <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
                </p>
                <p className="mt-1">
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p className="mt-1">
                  <strong>Expected Delivery Date:</strong>{" "}
                  {new Date(order.expectedDeliveryDate).toLocaleDateString()}
                </p>
                <p
                  className={`mt-1 font-semibold ${
                    order.paymentStatus === "Pending"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  <strong>Payment Status:</strong> {order.paymentStatus}
                </p>
                <p
                  className={`mt-1 font-semibold ${
                    order.AcceptanceStatus === "Accepted"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <strong>Acceptance Status:</strong> {order.AcceptanceStatus}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsPage;
