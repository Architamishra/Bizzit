import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const StockPage = () => {
  const navigate = useNavigate();
  const [stockItems, setStockItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItem, setExpandedItem] = useState(null);

  const fetchStockItems = async () => {
    const distributorId = localStorage.getItem("register1");
    try {
      const response = await fetch(
        `http://localhost:3300/api/stock?distributorId=${distributorId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStockItems(data);
    } catch (error) {
      console.error("Error fetching stock items:", error);
    }
  };

  useEffect(() => {
    fetchStockItems();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/stock/update/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await fetch(`http://localhost:3300/api/stock/${id}`, {
          method: "DELETE",
        });
        // Re-fetch stock items after deletion
        fetchStockItems();
      } catch (error) {
        console.error("Error deleting stock item:", error);
      }
    }
  };

  const toggleDetails = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  // Filter stock items based on search term
  const filteredStockItems = stockItems.filter((item) =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Define a threshold for stock alert
  const stockAlertThreshold = 10;

  // Get low stock items
  const lowStockItems = filteredStockItems.filter((item) =>
    item.variants.some(
      (variant) =>
        (variant.stockDetails?.stocksInPackage || 0) < stockAlertThreshold
    )
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-6 ml-64 mt-16">
        <Header />
        <div className="container mx-auto">
          {/* Sticky Alert for Low Stock Items */}
          {lowStockItems.length > 0 && (
            <div className="bg-red-200 p-4 rounded mb-4 sticky top-0 z-10">
              <h2 className="font-bold">Low Stock Alert!</h2>
              <p>
                The following products have low stock:
                {lowStockItems.map((item) => (
                  <span key={item._id} className="font-semibold">
                    {" "}
                    {item.productName},
                  </span>
                ))}
              </p>
            </div>
          )}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Stock Page</h1>
          </div>
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by Product Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            {filteredStockItems.length > 0 ? (
              filteredStockItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-semibold">
                        {item.productName}
                      </h2>
                      {/* Display stock left for all variants vertically */}
                      {item.variants.map((variant, index) => {
                        const stockLeft =
                          variant.stockDetails?.stocksInPackage || 0;
                        return (
                          <div key={variant._id} className="flex items-center">
                            <p className="text-lg font-bold">
                              Variant {index + 1}: Stock Left: {stockLeft}
                            </p>
                            {/* Stock alert */}
                            {stockLeft < stockAlertThreshold && (
                              <span className="ml-2 text-red-500 font-bold">
                                (Low Stock Alert!)
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      <button
                        onClick={() => handleUpdate(item._id)}
                        className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 mr-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleDetails(item._id)}
                    className="mt-2 text-blue-500 hover:underline"
                  >
                    {expandedItem === item._id ? "View Less" : "View More"}
                  </button>
                  {expandedItem === item._id && (
                    <div className="mt-4">
                      {item.variants.map((variant, index) => (
                        <div
                          key={variant._id}
                          className="border rounded-lg p-4 bg-gray-50 shadow mb-4"
                        >
                          <h3 className="font-semibold text-lg">
                            Variant {index + 1}:
                          </h3>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                              <p>
                                <strong>Color:</strong>{" "}
                                {variant.attributes?.Color || "N/A"}
                              </p>
                              <p>
                                <strong>Weight:</strong>{" "}
                                {variant.attributes?.Weight || "N/A"}
                              </p>
                              <p>
                                <strong>Size:</strong>{" "}
                                {variant.attributes?.Size || "N/A"}
                              </p>
                            </div>
                            <div>
                              <p>
                                <strong>Units Per Package:</strong>{" "}
                                {variant.stockDetails?.unitsPerPackage || "N/A"}
                              </p>
                              <p>
                                <strong>Stocks In Package:</strong>{" "}
                                {variant.stockDetails?.stocksInPackage || "N/A"}
                              </p>
                              <p>
                                <strong>Leftover Units:</strong>{" "}
                                {variant.stockDetails?.leftoverUnits || "N/A"}
                              </p>
                              <p>
                                <strong>Total Available Units:</strong>{" "}
                                {variant.stockDetails?.totalAvailableUnits ||
                                  "N/A"}
                              </p>
                              <p>
                                <strong>Return Quantity:</strong>{" "}
                                {variant.stockDetails?.returnQuantity || "N/A"}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p>
                              <strong>CGST:</strong>{" "}
                              {variant.pricing?.cgst || "N/A"}
                            </p>
                            <p>
                              <strong>SGST:</strong>{" "}
                              {variant.pricing?.sgst || "N/A"}
                            </p>
                            <p>
                              <strong>Retail Price With Tax:</strong>{" "}
                              {variant.pricing?.retailPriceWithTax || "N/A"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div>No stock items available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockPage;
