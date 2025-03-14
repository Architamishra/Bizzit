import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const InventoryPage = () => {
  const navigate = useNavigate();
  const [inventoryItems, setInventoryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchInventoryItems = async () => {
      const distributorId = localStorage.getItem("register1");
      try {
        const response = await fetch(
          `http://localhost:3300/api/inventory?distributorId=${distributorId}`
        ); // Pass distributorId as a query parameter
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInventoryItems(data);
      } catch (error) {
        console.error("Error fetching inventory items:", error);
      }
    };

    fetchInventoryItems();
  }, []);

  const handleAddProductClick = () => {
    navigate("/add-product");
  };

  const handleUpdate = (id) => {
    navigate(`/inventory/update/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(
          `http://localhost:3300/api/inventory/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Re-fetch inventory items after deletion
        setInventoryItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        toast.success("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting inventory item:", error);
        toast.error(
          "Error deleting product: " +
            (error.response ? error.response.data : error.message)
        );
      }
    }
  };

  // Filter inventory items based on search term
  const filteredInventoryItems = inventoryItems.filter(
    (item) =>
      item.product.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Filter by product name
      item.supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-6 ml-64 mt-16">
        <Header />
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Inventory Page</h1>
            <button
              onClick={handleAddProductClick}
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Add New Product
            </button>
          </div>
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by Product Name or Supplier Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Product ID</th>
                  <th className="border px-4 py-2">Distributor ID</th>
                  <th className="border px-4 py-2">Supplier ID</th>
                  <th className="border px-4 py-2">Supplier Name</th>
                  <th className="border px-4 py-2">Supplier Connection Code</th>
                  <th className="border px-4 py-2">Product Name</th>
                  <th className="border px-4 py-2">Product Code</th>
                  <th className="border px-4 py-2">Category</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Volume</th>
                  <th className="border px-4 py-2">Color</th>
                  <th className="border px-4 py-2">Weight</th>
                  <th className="border px-4 py-2">Size</th>
                  <th className="border px-4 py-2">Buy Price Without Tax</th>
                  <th className="border px-4 py-2">Buy CGST</th>
                  <th className="border px-4 py-2">Buy SGST</th>
                  <th className="border px-4 py-2">Total Buy Price With Tax</th>
                  <th className="border px-4 py-2">Retail Price Without Tax</th>
                  <th className="border px-4 py-2">Retail CGST</th>
                  <th className="border px-4 py-2">Retail SGST</th>
                  <th className="border px-4 py-2">
                    Total Retail Price With Tax
                  </th>
                  <th className="border px-4 py-2">MRP</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventoryItems.length > 0 ? (
                  filteredInventoryItems.map((item) =>
                    item.variants && item.variants.length > 0 ? (
                      item.variants.map((variant, index) => (
                        <tr key={variant._id}>
                          {index === 0 && (
                            <>
                              <td
                                className="border px-4 py-2"
                                rowSpan={item.variants.length}
                              >
                                {item._id}
                              </td>
                              <td
                                className="border px-4 py-2"
                                rowSpan={item.variants.length}
                              >
                                {item.distributorId}
                              </td>
                              <td
                                className="border px-4 py-2"
                                rowSpan={item.variants.length}
                              >
                                {item.supplier.id}
                              </td>
                              <td
                                className="border px-4 py-2"
                                rowSpan={item.variants.length}
                              >
                                {item.supplier.name}
                              </td>
                              <td
                                className="border px-4 py-2"
                                rowSpan={item.variants.length}
                              >
                                {item.supplier.connectionCode}
                              </td>
                              <td
                                className="border px-4 py-2"
                                rowSpan={item.variants.length}
                              >
                                {item.product.name}
                              </td>
                              <td
                                className="border px-4 py-2"
                                rowSpan={item.variants.length}
                              >
                                {item.product.code}
                              </td>
                              <td
                                className="border px-4 py-2"
                                rowSpan={item.variants.length}
                              >
                                {item.product.category}
                              </td>
                              <td
                                className="border px-4 py-2"
                                rowSpan={item.variants.length}
                              >
                                {item.product.description}
                              </td>
                            </>
                          )}
                          <td className="border px-4 py-2">
                            {variant.attributes?.Volume || "N/A"}
                          </td>
                          <td className="border px-4 py-2">
                            {variant.attributes?.Color || "N/A"}
                          </td>
                          <td className="border px-4 py-2">
                            {variant.attributes?.Weight || "N/A"}
                          </td>
                          <td className="border px-4 py-2">
                            {variant.attributes?.Size || "N/A"}
                          </td>
                          <td className="border px-4 py-2">
                            {variant.pricing?.buyPriceWithoutTax || "N/A"}
                          </td>
                          <td className="border px-4 py-2">
                            {variant.pricing?.buyCgst || "N/A"}
                          </td>
                          <td className="border px-4 py-2">
                            {variant.pricing?.buySgst || "N/A"}
                          </td>
                          <td className="border px-4 py-2">
                            {variant.pricing?.totalBuyPriceWithTax || "N/A"}
                          </td>
                          <td className="border px-4 py-2">
                            {variant.pricing?.retailPriceWithoutTax || "N/A"}
                          </td>
                          <td className="border px-4 py-2">
                            {variant.pricing?.retailCgst || "N/A"}
                          </td>
                          <td className="border px-4 py-2">
                            {variant.pricing?.retailSgst || "N/A"}
                          </td>
                          <td className="border px-4 py-2">
                            {variant.pricing?.totalRetailPriceWithTax || "N/A"}
                          </td>
                          <td className="border px-4 py-2">
                            {variant.pricing?.mrp || "N/A"}
                          </td>
                          {index === 0 && (
                            <td
                              className="border px-4 py-2"
                              rowSpan={item.variants.length}
                            >
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
                            </td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr key={item._id}>
                        <td className="border px-4 py-2" colSpan="21">
                          No variants available
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td className="border px-4 py-2" colSpan="21">
                      No inventory items available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer /> {/* Add ToastContainer here */}
      </div>
    </div>
  );
};

export default InventoryPage;
