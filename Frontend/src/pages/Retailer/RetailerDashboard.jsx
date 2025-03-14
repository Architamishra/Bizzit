import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RetailerSidebar from "../../components/SidebarRetailer";
import Header from "../../components/HeaderRetailer";

const RetailerDashboard = () => {
  const [recentOrders, setRecentOrders] = useState([]);
  const retailerId = localStorage.getItem("register1");
  const navigate = useNavigate();

  useEffect(() => {
    if (retailerId) {
      fetchRecentOrders();
    }
  }, [retailerId]);

  const fetchRecentOrders = async () => {
    try {
      const response = await fetch(
        `http://localhost:3300/api/orderView/retailer/${retailerId}`
      );
      const data = await response.json();
      setRecentOrders(data.slice(0, 2)); // Get only the two most recent orders
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="dashboard flex">
      <RetailerSidebar />
      <div className="main-content flex-1 ml-64 p-4">
        <Header />
        <div className="content mt-4">
          <h1 className="text-2xl font-bold">
            Welcome to the Retailer Dashboard
          </h1>
          <div className="mt-4 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            {recentOrders.length > 0 ? (
              <table className="w-full border-collapse border border-gray-300 mt-2">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Order Date</th>
                    <th className="border p-2">Product Name</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order._id} className="border">
                      <td className="border p-2">
                        {order.orderDate
                          ? new Date(order.orderDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="border p-2">
                        {order.productId?.productName || "Unknown Product"}
                      </td>
                      <td className="border p-2">{order.quantity}</td>
                      <td className="border p-2">₹{order.totalAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="mt-2">No recent orders found.</p>
            )}
            <button
              className="mt-4 bg-blue-500 text-white p-2 rounded"
              onClick={() => navigate("/retailer/order-products")}
            >
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerDashboard;
