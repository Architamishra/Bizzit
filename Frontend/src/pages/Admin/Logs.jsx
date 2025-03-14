import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import Header from "../../components/AdminHeader";

const ViewUsers = () => {
  const [activeTab, setActiveTab] = useState("logins");
  const [loginLogs, setLoginLogs] = useState([]);
  const [logoutLogs, setLogoutLogs] = useState([]);

  useEffect(() => {
    if (activeTab === "logins") {
      fetchLoginLogs();
    } else if (activeTab === "logouts") {
      fetchLogoutLogs();
    }
  }, [activeTab]);

  const fetchLoginLogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3300/api/logs/login-logs"
      );
      setLoginLogs(response.data);
    } catch (error) {
      console.error("Error fetching login logs:", error);
    }
  };

  const fetchLogoutLogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3300/api/logs/logout-logs"
      );
      setLogoutLogs(response.data);
    } catch (error) {
      console.error("Error fetching logout logs:", error);
    }
  };

  return (
    <div className="dashboard flex">
      <AdminSidebar />
      <div className="main-content flex-1 ml-64 p-4">
        <Header />
        <div className="content mt-4">
          <h1 className="text-2xl font-bold">Logs</h1>
          <div className="tabs mt-4 flex border-b">
            <button
              className={`p-2 mr-4 ${
                activeTab === "logins" ? "border-b-2 border-purple-500" : ""
              }`}
              onClick={() => setActiveTab("logins")}
            >
              Logins
            </button>
            <button
              className={`p-2 ${
                activeTab === "logouts" ? "border-b-2 border-purple-500" : ""
              }`}
              onClick={() => setActiveTab("logouts")}
            >
              Logouts
            </button>
          </div>

          {activeTab === "logins" && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Login Logs</h2>
              <table className="w-full border mt-2">
                <thead>
                  <tr className="bg-green-500 text-white">
                    <th className="p-2">User ID</th>
                    <th className="p-2">Full Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {loginLogs.length > 0 ? (
                    loginLogs.map((log, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{log._id}</td>
                        <td className="p-2">{log.fullname}</td>
                        <td className="p-2">{log.email}</td>
                        <td className="p-2">{log.lastLoginDate}</td>
                        <td className="p-2">{log.lastLoginTime}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center p-2">
                        No login logs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "logouts" && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Logout Logs</h2>
              <table className="w-full border mt-2">
                <thead>
                  <tr className="bg-red-500 text-white">
                    <th className="p-2">Retailer ID</th>
                    <th className="p-2">Retailer Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {logoutLogs.length > 0 ? (
                    logoutLogs.map((log, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{log.retailerId}</td>
                        <td className="p-2">{log.retailerName}</td>
                        <td className="p-2">{log.emailId}</td>
                        <td className="p-2">{log.date}</td>
                        <td className="p-2">{log.time}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center p-2">
                        No logout logs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewUsers;
