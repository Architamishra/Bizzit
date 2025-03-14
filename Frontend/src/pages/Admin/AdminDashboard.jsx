import React, { useEffect, useState } from "react"; // Importing React and hooks
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import AdminSidebar from "../../components/AdminSidebar"; // Importing the Admin Sidebar component
import Header from "../../components/AdminHeader"; // Importing the Admin Header component
import axios from "axios"; // Importing axios for making HTTP requests

const AdminDashboard = () => {
  // State variables to hold user data
  const [users, setUsers] = useState([]); // State to store all users
  const [totalUsers, setTotalUsers] = useState(0); // State to store total number of users
  const [distributors, setDistributors] = useState([]); // State to store distributors
  const [retailers, setRetailers] = useState([]); // State to store retailers
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // useEffect hook to fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Making a GET request to fetch users from the API
        const response = await axios.get(
          "http://localhost:3300/api/admin/users" // Adjust the API endpoint as needed
        );
        setUsers(response.data); // Set the users state with the fetched data
        setTotalUsers(response.data.length); // Set total users count

        // Separate distributors and retailers based on their roles
        const distributorsList = response.data.filter(
          (user) => user.role === "distributor" // Filter for distributors
        );
        const retailersList = response.data.filter(
          (user) => user.role === "retailer" // Filter for retailers
        );

        // Update state with the filtered lists
        setDistributors(distributorsList);
        setRetailers(retailersList);
      } catch (error) {
        // Log any errors that occur during the fetch
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(); // Call the fetch function
  }, []); // Empty dependency array means this runs once on mount

  // Function to handle navigation to the distributor view
  const handleViewDistributors = () => {
    navigate("/view-distributors"); // Navigate to distributor view page
  };

  // Function to handle navigation to the retailer view
  const handleViewRetailers = () => {
    navigate("/view-retailers"); // Navigate to retailer view page
  };

  // Function to handle logout
  const handleLogout = () => {
    // Clear authentication details from localStorage
    localStorage.removeItem("authToken"); // Remove auth token
    localStorage.removeItem("user"); // Remove stored user info if applicable

    // Reset state variables
    setUsers([]);
    setTotalUsers(0);
    setDistributors([]);
    setRetailers([]);

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar /> {/* Admin Sidebar */}
      <div className="flex-1 flex flex-col ml-64">
        {" "}
        {/* Main content area */}
        <Header /> {/* Admin Header */}
        <div className="flex-1 p-4 bg-gray-100 mt-4">
          {" "}
          {/* Content area */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome to the Admin Dashboard
            </h1>
            <button
              onClick={handleLogout} // Logout button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          </div>
          {/* Total Users Section */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center mt-4">
            <h2 className="text-2xl font-semibold text-gray-700">
              Total Users
            </h2>
            <p className="text-4xl font-bold text-blue-600">{totalUsers}</p>
          </div>
          <div className="mt-4 flex justify-between">
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center w-1/2 mx-2">
              <h3 className="text-2xl font-semibold text-gray-700">
                Distributors
              </h3>
              <p className="text-4xl font-bold text-blue-600">
                {distributors.length} {/* Display number of distributors */}
              </p>
              <button
                onClick={handleViewDistributors} // Button to view distributors
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                View Distributors
              </button>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center w-1/2 mx-2">
              <h3 className="text-2xl font-semibold text-gray-700">
                Retailers
              </h3>
              <p className="text-4xl font-bold text-green-600">
                {retailers.length} {/* Display number of retailers */}
              </p>
              <button
                onClick={handleViewRetailers} // Button to view retailers
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
              >
                View Retailers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; // Exporting the AdminDashboard component
