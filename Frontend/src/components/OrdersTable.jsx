// src/components/OrdersTable.jsx
import React from "react";
import { FaArrowRight } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom"; // Import useNavigate

const OrdersTable = ({ latestOrders }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleViewMore = () => {
    navigate('/orders'); // Navigate to the OrdersPage
  };

  return (
    <div className="orders-table bg-white shadow-lg rounded-lg overflow-hidden p-4">
      <h3 style={{ fontSize: '25px', fontWeight: 'bold', marginBottom: '5px', marginTop: '-10px' }}>
        New / Recent Orders
      </h3>
      {latestOrders.length > 0 ? (
        <table className="min-w-full table-auto">
          <thead className="bg-lilac-100 text-white">
            <tr>
              <th className="p-4 text-left">Retailer Name</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {latestOrders.map((order) => (
              <tr key={order._id} className="hover:bg-lilac-50 transition-colors">
                <td className="p-4 border-none">{order.retailerName || "N/A"}</td>
                <td className="p-4 border-none">{order.productId?.productName || "N/A"}</td>
                <td className="p-4 border-none">{order.quantity || "N/A"}</td>
                <td className="p-4 border-none">{order.totalAmount || "N/A"} Rs</td>
                <td className="p-4 border-none">
                  <span className={`py-1 px-3 rounded-full ${order.completeStatus === "Completed" ? "bg-green-400 text-white" : "bg-yellow-400 text-white"}`}>
                    {order.completeStatus || "N/A"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center p-4">No new orders found.</div>
      )}
      <div className="view-more-container">
        <button className="view-more-btn" onClick={handleViewMore}>
          View More <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default OrdersTable;