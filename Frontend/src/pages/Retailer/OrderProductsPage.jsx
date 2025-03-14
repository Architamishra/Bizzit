import { useEffect, useState } from "react";

const OrderProductPage = () => {
  const [orders, setOrders] = useState([]);
  const retailerId = localStorage.getItem("register1");
  const [activeTab, setActiveTab] = useState("acceptance");
  const [returnReason, setReturnReason] = useState({});

  useEffect(() => {
    if (retailerId) {
      fetchOrders();
    }
  }, [retailerId]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `http://localhost:3300/api/orderView/retailer/${retailerId}`
      );
      const data = await response.json();
      console.log("Fetched Orders in Frontend:", data);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleReturn = async (order) => {
    const reason = returnReason[order._id];
    if (!reason) {
      alert("Please provide a reason for return.");
      return;
    }

    const returnData = {
      retailerId: retailerId,
      productId: order.productId?._id,
      productName: order.productId?.productName,
      orderDate: order.orderDate,
      reason: reason,
      returnDate: new Date(),
    };

    console.log("Return Request Data:", returnData);

    try {
      const response = await fetch("http://localhost:3300/api/returns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(returnData),
      });

      const data = await response.json();
      console.log("Return API Response:", data);

      if (response.ok) {
        alert("Return request submitted successfully.");

        setReturnReason((prev) => ({ ...prev, [order._id]: "" }));
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error submitting return request:", error);
      alert("Failed to submit return request.");
    }
  };

  const acceptanceOrders = orders.filter(
    (order) =>
      order.AcceptanceStatus !== "Accepted" ||
      order.completeStatus !== "Completed" ||
      order.paymentStatus !== "Paid"
  );

  const completionOrders = orders.filter(
    (order) =>
      order.AcceptanceStatus === "Accepted" &&
      order.completeStatus === "Completed" &&
      order.paymentStatus === "Paid"
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

      <div className="flex gap-4 mb-4">
        <button
          className={`p-2 border ${
            activeTab === "acceptance"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("acceptance")}
        >
          Acceptance
        </button>
        <button
          className={`p-2 border ${
            activeTab === "completion"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("completion")}
        >
          Completion
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Order Date</th>
            <th className="border p-2">Retailer ID</th>
            <th className="border p-2">Retailer Name</th>
            <th className="border p-2">Distributor Name</th>
            <th className="border p-2">Product ID</th>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Total Amount</th>
            <th className="border p-2">Completion Status</th>
            <th className="border p-2">Acceptance Status</th>
            <th className="border p-2">Payment Status</th>
            {activeTab === "completion" && (
              <th className="border p-2">Return</th>
            )}
          </tr>
        </thead>
        <tbody>
          {(activeTab === "acceptance" ? acceptanceOrders : completionOrders)
            .length > 0 ? (
            (activeTab === "acceptance"
              ? acceptanceOrders
              : completionOrders
            ).map((order) => (
              <tr key={order._id} className="border">
                <td className="border p-2">
                  {order.orderDate
                    ? new Date(order.orderDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="border p-2">{order.retailerId}</td>
                <td className="border p-2">{order.retailerName}</td>
                <td className="border p-2">
                  {order.distributorId?.distributorName ||
                    "Unknown Distributor"}
                </td>
                <td className="border p-2">
                  {order.productId?._id || "Unknown ID"}
                </td>
                <td className="border p-2">
                  {order.productId?.productName || "Unknown Product"}
                </td>
                <td className="border p-2">{order.quantity}</td>
                <td className="border p-2">₹{order.totalAmount}</td>
                <td className="border p-2">{order.completeStatus}</td>
                <td className="border p-2">{order.AcceptanceStatus}</td>
                <td className="border p-2">{order.paymentStatus}</td>
                {activeTab === "completion" && (
                  <td className="border p-2">
                    <input
                      type="text"
                      placeholder="Return Reason"
                      value={returnReason[order._id] || ""}
                      onChange={(e) =>
                        setReturnReason({
                          ...returnReason,
                          [order._id]: e.target.value,
                        })
                      }
                      className="border p-1 mr-2"
                    />
                    <button
                      onClick={() => handleReturn(order)} // Fix applied here
                      className="bg-red-500 text-white p-2"
                    >
                      Return
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className="p-4 text-center">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderProductPage;
