import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [activeTab, setActiveTab] = useState("Pending");

  useEffect(() => {
    const fetchOrders = async () => {
      const distributorId = localStorage.getItem("register1");
      console.log("Distributor ID:", distributorId);

      if (!distributorId) {
        setError("Distributor ID not found in local storage.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3300/api/distributor/orderView?distributorId=${distributorId}`
        );
        console.log("Fetch response status:", response.status);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        console.log("Fetched Orders:", data);

        if (Array.isArray(data) && data.length > 0) {
          const sortedOrders = data.sort(
            (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
          );
          setOrders(sortedOrders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Error fetching orders:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleExpandOrder = (orderId) => {
    console.log("Toggling order expansion for ID:", orderId);
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const updateExpectedDeliveryDate = async (orderId, newDate) => {
    console.log(
      "Updating expected delivery date for order ID:",
      orderId,
      "to:",
      newDate
    );
    try {
      const response = await fetch(
        `http://localhost:3300/api/distributor/updateExpectedDeliveryDate/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ expectedDeliveryDate: newDate }),
        }
      );

      console.log("Update expected delivery response status:", response.status);
      if (!response.ok)
        throw new Error("Failed to update expected delivery date");

      const updatedOrder = await response.json();
      console.log("Updated Order after delivery date change:", updatedOrder);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder.order._id ? updatedOrder.order : order
        )
      );
      toast.success("Expected delivery date updated successfully!");
    } catch (err) {
      console.error("Error updating expected delivery date:", err.message);
      setError(err.message);
      toast.error("Error updating expected delivery date: " + err.message);
    }
  };

  const updateAcceptanceStatus = async (orderId, status) => {
    console.log(`Updating acceptance status for order ${orderId} to ${status}`);
    try {
      const response = await fetch(
        `http://localhost:3300/api/distributor/updateAcceptanceStatus/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      console.log("Update acceptance response status:", response.status);
      if (!response.ok) throw new Error("Failed to update acceptance status");

      const updatedOrder = await response.json();
      console.log(
        "Updated Order after acceptance status change:",
        updatedOrder
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder.order._id ? updatedOrder.order : order
        )
      );
      toast.success(
        `Order ${status === "Accepted" ? "accepted" : "rejected"} successfully!`
      );
    } catch (err) {
      console.error("Error updating acceptance status:", err.message);
      setError(err.message);
      toast.error("Error updating acceptance status: " + err.message);
    }
  };

  const updatePaymentStatus = async (orderId) => {
    console.log("Updating payment status for order ID:", orderId);
    try {
      const response = await fetch(
        `http://localhost:3300/api/distributor/updatePaymentStatus/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Paid" }),
        }
      );

      console.log("Update payment response status:", response.status);
      if (!response.ok) throw new Error("Failed to update payment status");

      const updatedOrder = await response.json();
      console.log("Updated Order after payment status change:", updatedOrder);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder.order._id ? updatedOrder.order : order
        )
      );
      toast.success("Payment status updated to 'Paid'!");
    } catch (err) {
      console.error("Error updating payment status:", err.message);
      setError(err.message);
      toast.error("Error updating payment status: " + err.message);
    }
  };

  const updateCompletionStatus = async (orderId) => {
    console.log("Updating completion status for order ID:", orderId);
    try {
      const response = await fetch(
        `http://localhost:3300/api/distributor/updateCompletionStatus/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Completed" }),
        }
      );

      console.log("Update completion response status:", response.status);
      if (!response.ok) throw new Error("Failed to update completion status");

      const updatedOrder = await response.json();
      console.log(
        "Updated Order after completion status change:",
        updatedOrder
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder.order._id ? updatedOrder.order : order
        )
      );
      toast.success("Order marked as completed!");
    } catch (err) {
      console.error("Error updating completion status:", err.message);
      setError(err.message);
      toast.error("Error updating completion status: " + err.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    );
  if (error)
    return <div className="text-red-600 text-center mt-6">Error: {error}</div>;

  const filteredOrders =
    activeTab === "Pending"
      ? orders.filter((order) => order.completeStatus !== "Completed")
      : orders.filter((order) => order.completeStatus === "Completed");

  return (
    <div className="flex">
      <Sidebar />
      <div className="content flex-1 p-6 mt-20 ml-60">
        <Header />
        <h1 className="text-2xl font-bold mb-4">Orders Page</h1>
        {/* Tabs for Pending and Completed Orders */}
        <div className="mb-4">
          <button
            onClick={() => setActiveTab("Pending")}
            className={`px-4 py-2 rounded ${
              activeTab === "Pending" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Pending Orders
          </button>
          <button
            onClick={() => setActiveTab("Completed")}
            className={`px-4 py-2 rounded ${
              activeTab === "Completed"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Completed Orders
          </button>
        </div>
        {filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-300 p-4 rounded-lg shadow-md hover:bg-gray-50"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <strong>Order ID:</strong> {order._id}
                  </div>
                  <div>
                    <strong>Retailer Name:</strong>{" "}
                    {order.retailerName || "N/A"}
                  </div>
                  <div>
                    <strong>Product Name:</strong>{" "}
                    {order.productId?.productName || "N/A"}
                  </div>

                  <div>
                    <strong>Total Amount:</strong> {order.totalAmount || "N/A"}
                  </div>
                  <div>
                    <strong>Order Date:</strong>{" "}
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleDateString()
                      : "N/A"}
                  </div>
                  <div>
                    <strong>Expected Delivery Date:</strong>
                    <input
                      type="date"
                      value={
                        order.expectedDeliveryDate
                          ? new Date(order.expectedDeliveryDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        updateExpectedDeliveryDate(order._id, e.target.value)
                      }
                      className="ml-2 border border-gray-300 rounded p-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div>
                    <strong>Acceptance Status:</strong>
                    <button
                      onClick={() => {
                        if (order.AcceptanceStatus !== "Accepted") {
                          updateAcceptanceStatus(order._id, "Accepted");
                        }
                      }}
                      className={`ml-2 px-2 py-1 rounded-lg ${
                        order.AcceptanceStatus === "Accepted"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                      disabled={order.AcceptanceStatus === "Accepted"} // Disable if already accepted
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => {
                        if (order.AcceptanceStatus !== "Rejected") {
                          updateAcceptanceStatus(order._id, "Rejected");
                        }
                      }}
                      className={`ml-2 px-2 py-1 rounded-lg ${
                        order.AcceptanceStatus === "Rejected"
                          ? "bg-red-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                    >
                      {order.AcceptanceStatus === "Rejected"
                        ? "Rejected"
                        : "Reject"}
                    </button>
                  </div>
                  <div>
                    <strong>Payment Status:</strong>
                    <button
                      onClick={() => {
                        if (order.paymentStatus !== "Paid") {
                          updatePaymentStatus(order._id);
                        }
                      }}
                      className={`ml-2 px-2 py-1 rounded-lg ${
                        order.paymentStatus === "Paid"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                    >
                      {order.paymentStatus || "N/A"}
                    </button>
                  </div>
                  <div>
                    <strong>Completion Status:</strong>
                    <button
                      onClick={() => {
                        if (order.completeStatus !== "Completed") {
                          updateCompletionStatus(order._id);
                        }
                      }}
                      className={`ml-2 px-2 py-1 rounded-lg ${
                        order.completeStatus === "Completed"
                          ? "bg-green-500 text-white"
                          : order.AcceptanceStatus !== "Accepted" ||
                            order.paymentStatus !== "Paid"
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-yellow-500 text-white"
                      }`}
                      disabled={
                        order.AcceptanceStatus !== "Accepted" ||
                        order.paymentStatus !== "Paid"
                      } // Disable if conditions are not met
                    >
                      {order.completeStatus || "N/A"}
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => toggleExpandOrder(order._id)}
                  className="mt-2 text-blue-500 hover:underline"
                >
                  {expandedOrderId === order._id ? "View Less" : "View More "}
                </button>
                {expandedOrderId === order._id && (
                  <div className="mt-2">
                    <div>
                      <strong>Product ID:</strong>{" "}
                      {typeof order.productId === "object"
                        ? order.productId._id || "N/A"
                        : order.productId}
                    </div>
                    <div>
                      <strong>Variant ID:</strong> {order.variantId || "N/A"}
                    </div>{" "}
                    {/* Add this line to show variantId */}
                    <div>
                      <strong>Variant:</strong>
                    </div>
                    <div className="border border-gray-200 rounded p-2">
                      {order.attributes ? (
                        <table className="w-full">
                          <tbody>
                            {Object.entries(order.attributes).map(
                              ([key, value]) => (
                                <tr key={key} className="border-b">
                                  <td className="py-1">
                                    <strong>{key}:</strong>
                                  </td>
                                  <td className="py-1">{value}</td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      ) : (
                        "N/A"
                      )}
                    </div>
                    <div>
                      <strong>Quantity:</strong> {order.quantity}
                    </div>
                    <div>
                      <strong>CGST:</strong> {order.cgst || "N/A"}
                    </div>
                    <div>
                      <strong>SGST:</strong> {order.sgst || "N/A"}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-4">
            <h2 className="text-3xl font-bold text-gray-800">
              No orders found.
            </h2>
            <p className="text-lg text-gray-600">
              It seems you have not placed any orders yet. Please check back
              later.
            </p>
          </div>
        )}
        <ToastContainer /> {/* Add ToastContainer here */}
      </div>
    </div>
  );
};

export default OrdersPage;
