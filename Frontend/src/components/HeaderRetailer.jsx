import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import "./header.css";

const HeaderRetailer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [distributors, setDistributors] = useState([]);
  const [filteredDistributors, setFilteredDistributors] = useState([]);
  const [retailer, setRetailer] = useState({
    id: "123456",
    name: "Manoj Singh",
  }); // Dummy retailer data

  // Fetch distributors from API
  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3300/api/distributors"
        );
        setDistributors(response.data);
      } catch (error) {
        console.error("Error fetching distributors:", error);
      }
    };

    fetchDistributors();
  }, []);

  // Filter distributors based on search input
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredDistributors([]);
      return;
    }

    const filtered = distributors.filter(
      (distributor) =>
        distributor.name &&
        distributor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredDistributors(filtered);
  }, [searchTerm, distributors]);

  // Handle connect button click
  const handleConnect = async (distributor) => {
    try {
      await axios.post("http://localhost:3300/api/connections", {
        retailerId: retailer.id,
        retailerName: retailer.name,
        distributorId: distributor._id,
        distributorName: distributor.name,
        status: "Pending",
      });
      alert(`Connection request sent to ${distributor.name}!`);
    } catch (error) {
      console.error("Error connecting:", error);
      alert("Failed to send connection request.");
    }
  };

  return (
    <header className="header">
      <input
        type="text"
        className="search-bar"
        placeholder="Search Distributor"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="profile">
        <div className="text-info">
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            {retailer.name}
          </p>
          <span className="distributor">Retailer</span>
        </div>
        <FaUserCircle className="profile-icon" />
      </div>

      {/* Search Results */}
      {filteredDistributors.length > 0 && (
        <div className="search-results">
          <ul>
            {filteredDistributors.map((distributor) => (
              <li key={distributor._id} className="distributor-card">
                <p>
                  <strong>Name:</strong> {distributor.name || "N/A"}
                </p>
                <p>
                  <strong>ID:</strong> {distributor._id || "N/A"}
                </p>
                <p>
                  <strong>Phone:</strong> {distributor.phone || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {distributor.email || "N/A"}
                </p>
                <button onClick={() => handleConnect(distributor)}>
                  Connect
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default HeaderRetailer;
