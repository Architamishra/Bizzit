import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const UpdateStockForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stockItem, setStockItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockItem = async () => {
      try {
        const response = await fetch(`http://localhost:3300/api/stock/${id}`);
        const data = await response.json();
        setStockItem(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock item:", error);
      }
    };

    fetchStockItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStockItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariants = [...stockItem.variants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      stockDetails: {
        ...updatedVariants[index].stockDetails,
        [name]: [
          "unitsPerPackage",
          "stocksInPackage",
          "leftoverUnits",
          "returnQuantity",
        ].includes(name)
          ? Number(value)
          : value,
      },
    };
    setStockItem((prevItem) => ({
      ...prevItem,
      variants: updatedVariants,
    }));
  };

  const calculateTotalAvailableUnits = (variant) => {
    const { unitsPerPackage, stocksInPackage, leftoverUnits, returnQuantity } =
      variant.stockDetails;
    return stocksInPackage * unitsPerPackage + leftoverUnits - returnQuantity;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3300/api/stock/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stockItem),
      });

      if (!response.ok) {
        throw new Error("Failed to update stock item");
      }

      toast.success("Stock item updated successfully!");

      // Delay navigation to allow the toast to be visible
      setTimeout(() => {
        navigate("/stock"); // Redirect to stock page after update
      }, 2000);
    } catch (error) {
      console.error("Error updating stock item:", error);
      toast.error(
        "Error updating stock item: " +
          (error.response ? error.response.data : error.message)
      ); // Show error notification
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-2xl font-bold mb-4">Update Stock Item</h2>
      <div className="mb-4">
        <label className="block mb-1">Distributor ID</label>
        <input
          type="text"
          name="distributorId"
          value={stockItem.distributorId}
          onChange={handleChange}
          disabled
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Product ID</label>
        <input
          type="text"
          name="productId"
          value={stockItem.productId}
          onChange={handleChange}
          disabled
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Product Name</label>
        <input
          type="text"
          name="productName"
          value={stockItem.productName}
          onChange={handleChange}
          disabled
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Packaging Type</label>
        <input
          type="text"
          name="packagingType"
          value={stockItem.packagingType}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      {/* Variations Fields */}
      <h2 className="text-lg font-semibold">Variants</h2>
      {stockItem.variants.map((variant, index) => (
        <div key={index} className="mb-4 border p-4 rounded">
          <h3 className="font-semibold">Variation {index + 1}</h3>
          <div className="mb-2">
            <label className="block text-gray-700">Volume</label>
            <input
              type="text"
              name="Volume"
              value={variant.attributes.Volume || ""}
              onChange={(e) => handleVariantChange(index, e)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Color</label>
            <input
              type="text"
              name="Color"
              value={variant.attributes.Color || ""}
              onChange={(e) => handleVariantChange(index, e)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Weight</label>
            <input
              type="text"
              name="Weight"
              value={variant.attributes.Weight || ""}
              onChange={(e) => handleVariantChange(index, e)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Size</label>
            <input
              type="text"
              name="Size"
              value={variant.attributes.Size || ""}
              onChange={(e) => handleVariantChange(index, e)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>

          {/* Stock Details */}
          <h4 className="font-semibold">Stock Details</h4>
          <div className="mb-2">
            <label className="block text-gray-700">Units Per Package</label>
            <input
              type="number"
              name="unitsPerPackage"
              value={variant.stockDetails.unitsPerPackage || 0}
              onChange={(e) => handleVariantChange(index, e)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Stocks In Package</label>
            <input
              type="number"
              name="stocksInPackage"
              value={variant.stockDetails.stocksInPackage || 0}
              onChange={(e) => handleVariantChange(index, e)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Leftover Units</label>
            <input
              type="number"
              name="leftoverUnits"
              value={variant.stockDetails.leftoverUnits || 0}
              onChange={(e) => handleVariantChange(index, e)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Return Quantity</label>
            <input
              type="number"
              name="returnQuantity"
              value={variant.stockDetails.returnQuantity || 0}
              onChange={(e) => handleVariantChange(index, e)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>

          {/* Total Available Units */}
          <div className="mb-4">
            <label className="block mb-1">Total Available Units</label>
            <input
              type="number"
              value={calculateTotalAvailableUnits(variant)} // Calculate total available units for each variant
              readOnly
              className="border p-2 w-full bg-gray-200"
            />
          </div>
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
      <ToastContainer /> {/* Add ToastContainer here */}
    </form>
  );
};

export default UpdateStockForm;
