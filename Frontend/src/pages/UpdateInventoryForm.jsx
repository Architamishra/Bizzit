import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const UpdateInventoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    _id: "",
    distributorId: "",
    supplier: {
      id: "",
      name: "",
      connectionCode: "",
    },
    product: {
      name: "",
      code: "",
      category: "",
      description: "",
    },
    variants: [],
  });

  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchInventoryItem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3300/api/inventory/${id}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching inventory item:", error);
      }
    };

    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:3300/api/suppliers");
        setSuppliers(response.data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchInventoryItem();
    fetchSuppliers();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "connectionCode") {
      setFormData((prevData) => ({
        ...prevData,
        supplier: {
          ...prevData.supplier,
          connectionCode: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSupplierChange = (e) => {
    const selectedSupplierId = e.target.value;
    const selectedSupplier = suppliers.find(
      (supplier) => supplier.suppid === selectedSupplierId
    );
    if (selectedSupplier) {
      setFormData((prevData) => ({
        ...prevData,
        supplier: {
          id: selectedSupplier.suppid,
          name: selectedSupplier.name,
          connectionCode: selectedSupplier.connectionCode || "",
        },
      }));
    }
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      product: {
        ...prevData.product,
        [name]: value,
      },
    }));
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariants = [...formData.variants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      attributes: {
        ...updatedVariants[index].attributes,
        [name]: value,
      },
      pricing: updatedVariants[index].pricing || {},
    };
    setFormData((prevData) => ({
      ...prevData,
      variants: updatedVariants,
    }));
  };

  const handlePricingChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariants = [...formData.variants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      pricing: {
        ...updatedVariants[index].pricing,
        [name]: value,
      },
    };

    // Calculate total buy price with tax
    const buyPriceWithoutTax =
      parseFloat(updatedVariants[index].pricing.buyPriceWithoutTax) || 0;
    const buyCgst = parseFloat(updatedVariants[index].pricing.buyCgst) || 0;
    const buySgst = parseFloat(updatedVariants[index].pricing.buySgst) || 0;

    const totalBuyPriceWithTax =
      buyPriceWithoutTax +
      (buyPriceWithoutTax * buyCgst) / 100 +
      (buyPriceWithoutTax * buySgst) / 100;
    updatedVariants[index].pricing.totalBuyPriceWithTax = parseFloat(
      totalBuyPriceWithTax.toFixed(2)
    );

    // Calculate total retail price with tax
    const retailPriceWithoutTax =
      parseFloat(updatedVariants[index].pricing.retailPriceWithoutTax) || 0;
    const retailCgst =
      parseFloat(updatedVariants[index].pricing.retailCgst) || 0;
    const retailSgst =
      parseFloat(updatedVariants[index].pricing.retailSgst) || 0;

    const totalRetailPriceWithTax =
      retailPriceWithoutTax +
      (retailPriceWithoutTax * retailCgst) / 100 +
      (retailPriceWithoutTax * retailSgst) / 100;
    updatedVariants[index].pricing.totalRetailPriceWithTax = parseFloat(
      totalRetailPriceWithTax.toFixed(2)
    );

    setFormData((prevData) => ({
      ...prevData,
      variants: updatedVariants,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3300/api/inventory/${formData._id}`,
        formData
      );
      toast.success("Inventory item updated successfully!"); // Show success notification

      // Delay navigation to allow the toast to be visible
      setTimeout(() => {
        navigate("/inventory"); // Redirect to stock page after update
      }, 2000); // Adjust the delay as needed (2000 ms = 2 seconds)
    } catch (error) {
      console.error("Error updating inventory item:", error);
      toast.error(
        "Error updating inventory item: " +
          (error.response ? error.response.data : error.message)
      ); // Show error notification
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Update Inventory Item</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md"
      >
        {/* Product ID */}
        <div className="mb-4">
          <label className="block text-gray-700">Product ID</label>
          <input
            type="text"
            name="_id"
            value={formData._id || ""}
            onChange={handleChange}
            disabled
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        {/* Distributor ID */}
        <div className="mb-4">
          <label className="block text-gray-700">Distributor ID</label>
          <input
            type="text"
            name="distributorId"
            value={formData.distributorId || ""}
            onChange={handleChange}
            disabled
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        {/* Supplier Fields */}
        <h2 className="text-lg font-semibold">Supplier</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Select Supplier</label>
          <select
            value={formData.supplier.id || ""}
            onChange={handleSupplierChange}
            className="border rounded w-full py-2 px-3"
            required
          >
            <option value="">Select Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.suppid} value={supplier.suppid}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>
        {/* Supplier Connection Code */}
        <div className="mb-4">
          <label className="block text-gray-700">
            Supplier Connection Code
          </label>
          <input
            type="text"
            name="connectionCode"
            value={formData.supplier.connectionCode || ""}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        {/* Product Fields */}
        <h2 className="text-lg font-semibold">Product</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.product.name || ""}
            onChange={handleProductChange}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Product Code</label>
          <input
            type="text"
            name="code"
            value={formData.product.code || ""}
            onChange={handleProductChange}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.product.category || ""}
            onChange={handleProductChange}
            disabled
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.product.description || ""}
            onChange={handleProductChange}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        {/* Variations Fields */}
        <h2 className="text-lg font-semibold">Variations</h2>
        {formData.variants.map((variant, index) => (
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

            {/* Pricing Fields */}
            <h4 className="font-semibold">Pricing</h4>
            <div className="mb-2">
              <label className="block text-gray-700">
                Buy Price Without Tax
              </label>
              <input
                type="number"
                name="buyPriceWithoutTax"
                value={variant.pricing.buyPriceWithoutTax || ""}
                onChange={(e) => handlePricingChange(index, e)}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Buy CGST (%)</label>
              <input
                type="number"
                name="buyCgst"
                value={variant.pricing.buyCgst || ""}
                onChange={(e) => handlePricingChange(index, e)}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Buy SGST (%)</label>
              <input
                type="number"
                name="buySgst"
                value={variant.pricing.buySgst || ""}
                onChange={(e) => handlePricingChange(index, e)}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">
                Total Buy Price With Tax
              </label>
              <input
                type="number"
                name="totalBuyPriceWithTax"
                value={variant.pricing.totalBuyPriceWithTax || ""}
                disabled
                className="border rounded w-full py-2 px-3 bg-gray-200"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">
                Retail Price Without Tax
              </label>
              <input
                type="number"
                name="retailPriceWithoutTax"
                value={variant.pricing.retailPriceWithoutTax || ""}
                onChange={(e) => handlePricingChange(index, e)}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Retail CGST (%)</label>
              <input
                type="number"
                name="retailCgst"
                value={variant.pricing.retailCgst || ""}
                onChange={(e) => handlePricingChange(index, e)}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Retail SGST (%)</label>
              <input
                type="number"
                name="retailSgst"
                value={variant.pricing.retailSgst || ""}
                onChange={(e) => handlePricingChange(index, e)}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">
                Total Retail Price With Tax
              </label>
              <input
                type="number"
                name="totalRetailPriceWithTax"
                value={variant.pricing.totalRetailPriceWithTax || ""}
                disabled
                className="border rounded w-full py-2 px-3 bg-gray-200"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">MRP</label>
              <input
                type="number"
                name="mrp"
                value={variant.pricing.mrp || ""}
                onChange={(e) => handlePricingChange(index, e)}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Update Product
        </button>
        <ToastContainer /> {/* Add ToastContainer here */}
      </form>
    </div>
  );
};

export default UpdateInventoryForm;
