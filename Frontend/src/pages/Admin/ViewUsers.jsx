import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import AdminSidebar from "../../components/AdminSidebar";
import Header from "../../components/AdminHeader";
import axios from "axios";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [distributors, setDistributors] = useState([]);
  const [retailers, setRetailers] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3300/api/admin/users"
        );
        setUsers(response.data);
        setTotalUsers(response.data.length);

        // Separate distributors and retailers
        const distributorsList = response.data.filter(
          (user) => user.role === "distributor"
        );
        const retailersList = response.data.filter(
          (user) => user.role === "retailer"
        );

        setDistributors(distributorsList);
        setRetailers(retailersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle navigation to the distributor view
  const handleViewDistributors = () => {
    navigate("/view-distributors"); // Navigate to the distributor view page
  };

  // Function to handle navigation to the retailer view
  const handleViewRetailers = () => {
    navigate("/view-retailers"); // Navigate to the retailer view page
  };

  return (
    <div className="dashboard flex">
      <AdminSidebar /> {/* Adding the Admin Sidebar */}
      <div className="main-content flex-1 ml-64 p-4">
        {" "}
        {/* Adjust margin-left based on sidebar width */}
        <Header /> {/* Adding the Header component */}
        <div className="content mt-4">
          <h1>View Users</h1>
          <h2>Total Users: {totalUsers}</h2>

          <div className="mt-4 flex justify-between">
            <div className="distributor-section">
              <h3>Distributors: {distributors.length}</h3>
              <button onClick={handleViewDistributors} className="btn-view">
                View
              </button>
            </div>

            <div className="retailer-section">
              <h3>Retailers: {retailers.length}</h3>
              <button onClick={handleViewRetailers} className="btn-view">
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUsers;
