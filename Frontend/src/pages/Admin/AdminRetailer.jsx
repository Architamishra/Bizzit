import React, { useEffect, useState } from "react"; // Importing React and hooks
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import AdminSidebar from "../../components/AdminSidebar"; // Importing the Admin Sidebar component
import Header from "../../components/AdminHeader"; // Importing the Admin Header component
import axios from "axios"; // Importing axios for making HTTP requests
import { FaArrowLeft } from "react-icons/fa"; // Importing the back arrow icon from react-icons

const ViewRetailers = () => {
  // State variable to hold the list of retailers
  const [retailers, setRetailers] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // useEffect hook to fetch retailers when the component mounts
  useEffect(() => {
    const fetchRetailers = async () => {
      try {
        console.log("Fetching retailers..."); // Debugging log
        // Making a GET request to fetch users from the API
        const response = await axios.get(
          "http://localhost:3300/api/admin/users"
        ); // Adjust the endpoint as necessary
        // Filtering the response data to get only retailers
        const retailersList = response.data.filter(
          (user) => user.role === "retailer"
        );
        console.log("Retailers fetched successfully:", retailersList); // Debugging log
        // Updating the state with the fetched retailers
        setRetailers(retailersList);
      } catch (error) {
        // Log any errors that occur during the fetch
        console.error("Error fetching retailers:", error); // Debugging log
      }
    };

    fetchRetailers(); // Call the fetch function
  }, []); // Empty dependency array means this runs once on mount

  // Function to handle navigation to retailer details
  const handleViewMore = (id) => {
    console.log(`Navigating to retailer details for ID: ${id}`); // Debugging log
    // Navigate to the retailer details page using the retailer ID
    navigate(`/retailer-details/${id}`);
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
          <h1 className="text-2xl font-bold mb-4">View Retailers</h1>{" "}
          {/* Title for the page */}
          <div className="retailers-list">
            {/* Mapping through the retailers array to display each retailer */}
            {retailers.map((retailer) => (
              <div
                key={retailer._id}
                className="retailer-card p-4 border rounded mb-4"
              >
                <h3>{retailer.fullname}</h3>{" "}
                {/* Display retailer's full name */}
                <p>Email: {retailer.email}</p> {/* Display retailer's email */}
                {/* Button to view more details about the retailer */}
                <button
                  onClick={() => handleViewMore(retailer._id)}
                  className="btn-view-more bg-blue-500 text-white p-2 rounded"
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

export default ViewRetailers; // Exporting the ViewRetailers component
