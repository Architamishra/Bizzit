import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useParams } from "react-router-dom";

const CustomerOrder = () => {
  const { retailerId } = useParams();
  console.log("🔍 useParams() received:", retailerId);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!retailerId) {
      console.error("❌ retailerId is undefined!");
      setError("Retailer ID is missing.");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        console.log(`📡 Fetching orders for Retailer ID: ${retailerId}`);
        const response = await fetch(
          `http://localhost:3300/api/v1/orders/retailers/${retailerId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        console.log("✅ Orders fetched:", data);
        setOrders(data);
      } catch (err) {
        console.error("⚠️ Error fetching orders:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [retailerId]);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="content flex-1 p-6 mt-20 ml-60">
        <Header />
        <h1 className="text-3xl font-bold mb-4">
          Orders for Retailer {retailerId}
        </h1>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found for this retailer.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">Product</th>
                <th className="py-2 px-4 border-b">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="py-2 px-4 border-b">{order._id}</td>
                  <td className="py-2 px-4 border-b">
                    {order.product?.name || "Unknown"}
                  </td>
                  <td className="py-2 px-4 border-b">{order.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CustomerOrder;
