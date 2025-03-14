import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getSuppliers, updateDealershipStatus } from "../api/SupplierApi";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const SuppliersPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [suppliers, setSuppliers] = useState([]); // State to hold suppliers
  const [expandedSupplier, setExpandedSupplier] = useState(null); // State to manage which supplier's products are expanded

  // Fetch suppliers when the component mounts
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = await getSuppliers(); // Fetch suppliers from the API
        setSuppliers(data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleAddSupplier = () => {
    navigate("/add-supplier"); // Navigate to the Add Supplier page
  };

  const toggleProducts = (supplierId) => {
    // Toggle the expanded state for the supplier
    setExpandedSupplier(expandedSupplier === supplierId ? null : supplierId);
  };

  const handleToggleDealershipStatus = async (product) => {
    try {
      const newStatus =
        product.dealershipStatus === "active" ? "inactive" : "active";
      await updateDealershipStatus(product._id, {
        dealershipStatus: newStatus,
      }); // Update the dealership status in the backend
      setSuppliers((prevSuppliers) =>
        prevSuppliers.map((supplier) => ({
          ...supplier,
          products: supplier.products.map((p) =>
            p._id === product._id ? { ...p, dealershipStatus: newStatus } : p
          ),
        }))
      );
      toast.success(`Dealership status updated to ${newStatus}!`); // Show success notification
    } catch (error) {
      console.error("Error updating dealership status:", error);
      toast.error(
        "Error updating dealership status: " +
          (error.response ? error.response.data : error.message)
      ); // Show error notification
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="content flex-1 p-6 mt-20 ml-60">
        <Header />
        <h1 className="text-2xl font-bold mb-4">Suppliers Page</h1>
        <p>This is the Suppliers page.</p>
        {/* Button to go to Add Supplier page */}
        <button
          onClick={handleAddSupplier}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded focus:outline-none"
        >
          Add Supplier
        </button>
        {/* List of suppliers */}
        <div className="mt-6">
          {suppliers.map((supplier) => (
            <div key={supplier._id} className="border p-4 mb-4 rounded shadow">
              <h2 className="text-lg font-semibold">{supplier.name}</h2>
              <p>Email: {supplier.email}</p>
              <p>Phone: {supplier.phone}</p>
              <p>Address: {supplier.address}</p>

              {/* Dropdown for products */}
              <button
                onClick={() => toggleProducts(supplier._id)}
                className="mt-2 px-2 py-1 bg-gray-300 rounded"
              >
                {expandedSupplier === supplier._id
                  ? "Hide Products"
                  : "Show Products"}
              </button>

              {expandedSupplier === supplier._id && (
                <div className="mt-2">
                  <h3 className="font-medium">Products:</h3>
                  {supplier.products.map((product) => (
                    <div key={product._id} className="border p-2 mt-1 rounded">
                      <p>
                        <strong>Product Name:</strong> {product.name}
                      </p>
                      <p>
                        <strong>Connect Code:</strong> {product.connectCode}
                      </p>
                      <p>
                        <strong>Description:</strong> {product.description}
                      </p>
                      <p>
                        <strong>Price:</strong> {product.price}
                      </p>

                      {/* Deal Active Button */}
                      <button
                        onClick={() => handleToggleDealershipStatus(product)} // Toggle dealership status
                        className={`mt-2 px-4 py-2 rounded focus:outline-none ${
                          product.dealershipStatus === "active"
                            ? "bg-green-500 text-white"
                            : "bg-yellow-500 text-black"
                        }`}
                      >
                        {product.dealershipStatus === "active"
                          ? "Deal Active"
                          : "Deal Inactive"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <ToastContainer /> {/* Add ToastContainer here */}
      </div>
    </div>
  );
};

export default SuppliersPage;
