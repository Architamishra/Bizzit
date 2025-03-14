import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const CustomersPage = () => {
  const [retailers, setRetailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRetailers = async () => {
      try {
        const response = await fetch("http://localhost:3300/api/v1/retailers");
        if (!response.ok) {
          throw new Error("Failed to fetch retailers");
        }
        const data = await response.json();
        setRetailers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRetailers();
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  const filteredRetailers = retailers.filter(
    (retailer) =>
      retailer.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      retailer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      retailer.phoneNumber.includes(searchQuery)
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="content flex-1 p-6 mt-20 ml-60">
        <Header />
        <h1 className="text-3xl font-bold mb-4">Customers Page</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search retailers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
        />

        {/* Retailers Table */}
        {filteredRetailers.length === 0 ? (
          <p className="text-gray-500">No retailers found.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Full Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone Number</th>
                <th className="py-2 px-4 border-b">Business Name</th>
                <th className="py-2 px-4 border-b">Store Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredRetailers.map((retailer) => (
                <tr key={retailer._id}>
                  <td className="py-2 px-4 border-b">{retailer.fullname}</td>
                  <td className="py-2 px-4 border-b">{retailer.email}</td>
                  <td className="py-2 px-4 border-b">{retailer.phoneNumber}</td>
                  <td className="py-2 px-4 border-b">
                    {retailer.business.businessName}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {retailer.businessDetails.storeName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CustomersPage;
