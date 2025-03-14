import React, { useEffect, useState } from "react"; // Importing React and hooks
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import AdminSidebar from "../../components/AdminSidebar"; // Importing the Admin Sidebar component
import Header from "../../components/AdminHeader"; // Importing the Admin Header component
import axios from "axios"; // Importing axios for making HTTP requests
import { FaArrowLeft } from "react-icons/fa"; // Importing the back arrow icon from react-icons

const ViewDistributors = () => {
  // State variable to hold the list of distributors
  const [distributors, setDistributors] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // useEffect hook to fetch distributors when the component mounts
  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        console.log("Fetching distributors..."); // Debugging log
        // Making a GET request to fetch users from the API
        const response = await axios.get(
          "http://localhost:3300/api/admin/users"
        ); // Adjust the endpoint as necessary
        // Filtering the response data to get only distributors
        const distributorsList = response.data.filter(
          (user) => user.role === "distributor"
        );
        console.log("Distributors fetched successfully:", distributorsList); // Debugging log
        // Updating the state with the fetched distributors
        setDistributors(distributorsList);
      } catch (error) {
        // Log any errors that occur during the fetch
        console.error("Error fetching distributors:", error); // Debugging log
      }
    };

    fetchDistributors(); // Call the fetch function
  }, []); // Empty dependency array means this runs once on mount

  // Function to handle navigation to distributor details
  const handleViewMore = (id) => {
    console.log(`Navigating to distributor details for ID: ${id}`); // Debugging log
    // Navigate to the distributor details page using the distributor ID
    navigate(`/distributor-details/${id}`);
  };

  // Function to handle back navigation to View Users page
  const handleBack = () => {
    // Navigate to the View Users page
    navigate("/view-users");
  };

  return (
    <div className="dashboard flex">
      <AdminSidebar /> {/* Add the Admin Sidebar */}
      <div className="main-content flex-1 ml-64 p-4">
        {" "}
        {/* Main content area with margin for sidebar */}
        <Header /> {/* Add the Header component */}
        <div className="content mt-4">
          <div className="flex items-center mb-4">
            {/* Back button to navigate to the previous page */}
            <button
              onClick={handleBack}
              className="flex items-center bg-purple-800 text-white p-3 rounded-full text-lg min-w-[120px]"
            >
              <FaArrowLeft className="mr-2" /> {/* Back arrow icon */}
              Back
            </button>
          </div>
          <h1>View Distributors</h1> {/* Title for the page */}
          <div className="distributors-list">
            {/* Mapping through the distributors array to display each distributor */}
            {distributors.map((distributor) => (
              <div
                key={distributor._id}
                className="distributor-card p-4 border rounded mb-4"
              >
                <h3>{distributor.fullname}</h3>{" "}
                {/* Display distributor's full name */}
                <p>Email: {distributor.email}</p>{" "}
                {/* Display distributor's email */}
                {/* Button to view more details about the distributor */}
                <button
                  onClick={() => handleViewMore(distributor._id)}
                  className="btn-view-more"
                >
                  View More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDistributors; // Exporting the ViewDistributors component
