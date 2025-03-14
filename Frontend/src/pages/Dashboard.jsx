// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import OrdersTable from "../components/OrdersTable";
import PaymentTable from "../components/PaymentTable";
import "./dashboard.css";

const Dashboard = () => {
  const [latestOrders, setLatestOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noOrdersMessage, setNoOrdersMessage] = useState("");

  useEffect(() => {
    const fetchLatestOrders = async () => {
      const distributorId = localStorage.getItem("register1");
      if (!distributorId) {
        setError("Distributor ID not found in local storage.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3300/api/distributor/orderView?distributorId=${distributorId}`
        );
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();

        if (data.message) {
          setNoOrdersMessage(data.message);
          setLatestOrders([]); // Clear the orders
        } else {
          const pendingOrders = data
            .filter((order) => order.completeStatus === "Pending")
            .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
            .slice(0, 2);

          setLatestOrders(pendingOrders);
        }
      } catch (err) {
        console.error("Error fetching latest orders:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestOrders();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    );
  if (error)
    return <div className="text-red-600 text-center mt-6">Error: {error}</div>;

  return (
    <div className="dashboard flex">
      <Sidebar />
      <div className="main-content flex-1 ml-64 p-4">
        <Header />
        <div className="content mt-4">
          {noOrdersMessage ? (
            <div className="text-center p-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {noOrdersMessage}
              </h2>
              <p className="text-lg text-gray-600">
                Please check back later for updates.
              </p>
            </div>
          ) : (
            <OrdersTable latestOrders={latestOrders} />
          )}
          <PaymentTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
