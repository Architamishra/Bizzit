import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RetailerSidebar from "../../components/SidebarRetailer";
import HeaderRetailer from "../../components/HeaderRetailer";
import axios from "axios";

const ViewDistributorsPage = () => {
  const [distributors, setDistributors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [connectedStatus, setConnectedStatus] = useState({});
  const [activeTab, setActiveTab] = useState("pending");
  const navigate = useNavigate();

  let retailerId = localStorage.getItem("register1") || null;

  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3300/api/distributors"
        );
        setDistributors(response.data);
      } catch (error) {
        console.error("❌ Error fetching distributors:", error);
      }
    };

    fetchDistributors();
  }, []);

  useEffect(() => {
    const fetchConnections = async () => {
      if (!retailerId) return;

      try {
        const response = await axios.get(
          `http://localhost:3300/api/connect2/status/${retailerId}`
        );
        const connectionData = response.data;

        const statusMap = connectionData.reduce(
          (acc, { distributorId, status }) => {
            acc[distributorId] = status;
            return acc;
          },
          {}
        );

        setConnectedStatus(statusMap);
      } catch (error) {
        console.error("❌ Error fetching connection status:", error);
      }
    };

    fetchConnections();
  }, [retailerId]);

  const handleViewProducts = (distributorId) => {
    navigate(`/pro/${distributorId}`);
  };

  const handleConnect = async (selectedDistributorId) => {
    try {
      if (!retailerId) {
        console.error("User not logged in or missing retailerId.");
        return;
      }

      await axios.post("http://localhost:3300/api/connect2/request", {
        retailerId,
        distributorId: selectedDistributorId,
      });

      setConnectedStatus((prev) => ({
        ...prev,
        [selectedDistributorId]: "pending",
      }));
      console.log("✅ Connection request sent successfully.");
    } catch (error) {
      console.error("❌ Error sending connection request:", error);
    }
  };

  const filteredDistributors = distributors.filter(({ fullname }) =>
    fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingDistributors = filteredDistributors.filter(
    ({ _id }) => !connectedStatus[_id] || connectedStatus[_id] === "pending"
  );

  const connectedDistributors = filteredDistributors.filter(
    ({ _id }) => connectedStatus[_id] === "Accepted"
  );

  return (
    <div className="dashboard flex">
      <RetailerSidebar />
      <div className="main-content flex-1 ml-64 p-4">
        <HeaderRetailer />
        <div className="content mt-4">
          <h1 className="text-3xl font-bold mb-6">View Distributors</h1>

          <input
            type="text"
            placeholder="Search Distributor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          />

          <div className="flex mb-4">
            <button
              className={`px-4 py-2 mr-2 ${
                activeTab === "pending"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              } rounded`}
              onClick={() => setActiveTab("pending")}
            >
              Pending Connections
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "connected"
                  ? "bg-green-500 text-white"
                  : "bg-gray-300"
              } rounded`}
              onClick={() => setActiveTab("connected")}
            >
              Connected Distributors
            </button>
          </div>

          {activeTab === "pending" &&
            (pendingDistributors.length > 0 ? (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 border border-gray-300">Name</th>
                    <th className="p-3 border border-gray-300">Email</th>
                    <th className="p-3 border border-gray-300">Phone Number</th>
                    <th className="p-3 border border-gray-300">Connection</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingDistributors.map(
                    ({ _id, fullname, email, phoneNumber }) => (
                      <tr key={_id} className="hover:bg-gray-100">
                        <td className="p-3 border border-gray-300">
                          {fullname}
                        </td>
                        <td className="p-3 border border-gray-300">{email}</td>
                        <td className="p-3 border border-gray-300">
                          {phoneNumber}
                        </td>
                        <td className="p-3 border border-gray-300 text-center">
                          {connectedStatus[_id] ? (
                            <span className="text-gray-500">Pending</span>
                          ) : (
                            <button
                              onClick={() => handleConnect(_id)}
                              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                            >
                              Connect
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            ) : (
              <p>📭 No pending connections found.</p>
            ))}

          {activeTab === "connected" &&
            (connectedDistributors.length > 0 ? (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 border border-gray-300">Name</th>
                    <th className="p-3 border border-gray-300">Email</th>
                    <th className="p-3 border border-gray-300">Phone Number</th>
                    <th className="p-3 border border-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {connectedDistributors.map(
                    ({ _id, fullname, email, phoneNumber }) => (
                      <tr key={_id} className="hover:bg-gray-100">
                        <td className="p-3 border border-gray-300">
                          {fullname}
                        </td>
                        <td className="p-3 border border-gray-300">{email}</td>
                        <td className="p-3 border border-gray-300">
                          {phoneNumber}
                        </td>
                        <td className="p-3 border border-gray-300 text-center">
                          <button
                            onClick={() => handleViewProducts(_id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                          >
                            View Products
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            ) : (
              <p>📭 No connected distributors found.</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewDistributorsPage;
