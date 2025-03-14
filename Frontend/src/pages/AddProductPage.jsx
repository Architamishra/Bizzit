import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { addProduct } from "../api/api";
import { getSuppliers } from "../api/SupplierApi";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const AddProductPage = () => {
  // State for basic product details
  const [distributorId, setDistributorId] = useState("");
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState("");
  const [selectedSupplierName, setSelectedSupplierName] = useState("");
  const [supplierConnectionCode, setSupplierConnectionCode] = useState("");
  const [packagingType, setPackagingType] = useState("Carton");
  const [activeProducts, setActiveProducts] = useState([]); // Active products of the selected supplier

  // State for dynamic variants
  const [variants, setVariants] = useState([
    {
      attributes: {},
      pricing: {
        buyPriceWithoutTax: 0,
        buyCgst: 0,
        buySgst: 0,
        totalBuyPriceWithTax: 0,
        retailPriceWithoutTax: 0,
        retailCgst: 0,
        retailSgst: 0,
        totalRetailPriceWithTax: 0,
        mrp: 0,
        dateAdded: new Date().toISOString(), // Set default dateAdded
      },
      stock: {
        unitsPerPackage: 0,
        stocksInPackage: 0,
        leftoverUnits: 0,
        totalAvailableUnits: 0,
        returnQuantity: 0,
        reorderLevel: 0,
      },
    },
  ]);

  // Variation types
  const variationTypes = ["Size", "Color", "Volume", "Weight"];
  const [selectedVariationTypes, setSelectedVariationTypes] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = await getSuppliers();
        setSuppliers(data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };
    fetchSuppliers();
  }, []);

  useEffect(() => {
    const storedDistributorId = localStorage.getItem("register1");
    if (storedDistributorId) {
      setDistributorId(storedDistributorId);
    }
  }, []);

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        attributes: {},
        pricing: {
          buyPriceWithoutTax: 0,
          buyCgst: 0,
          buySgst: 0,
          totalBuyPriceWithTax: 0,
          retailPriceWithoutTax: 0,
          retailCgst: 0,
          retailSgst: 0,
          totalRetailPriceWithTax: 0,
          mrp: 0,
          dateAdded: new Date().toISOString(),
        },
        stock: {
          unitsPerPackage: 0,
          stocksInPackage: 0,
          leftoverUnits: 0,
          totalAvailableUnits: 0,
          returnQuantity: 0,
          reorderLevel: 0,
        },
      },
    ]);
  };

  const removeVariant = (index) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;

    if (field === "stock") {
      const totalUnits =
        newVariants[index].stock.unitsPerPackage *
          newVariants[index].stock.stocksInPackage +
        newVariants[index].stock.leftoverUnits -
        newVariants[index].stock.returnQuantity;
      newVariants[index].stock.totalAvailableUnits = totalUnits;
    }

    if (field === "pricing") {
      const buyPrice = newVariants[index].pricing.buyPriceWithoutTax || 0;
      const cgst = newVariants[index].pricing.buyCgst || 0;
      const sgst = newVariants[index].pricing.buySgst || 0;

      const cgstAmount = (buyPrice * cgst) / 100;
      const sgstAmount = (buyPrice * sgst) / 100;

      const totalBuyPriceWithTax = buyPrice + cgstAmount + sgstAmount;
      newVariants[index].pricing.totalBuyPriceWithTax = parseFloat(
        totalBuyPriceWithTax.toFixed(2)
      );
    }

    // Calculate total retail price with tax
    if (field === "pricing") {
      const retailPrice = newVariants[index].pricing.retailPriceWithoutTax || 0;
      const retailCgst = newVariants[index].pricing.retailCgst || 0;
      const retailSgst = newVariants[index].pricing.retailSgst || 0;

      const retailCgstAmount = (retailPrice * retailCgst) / 100;
      const retailSgstAmount = (retailPrice * retailSgst) / 100;

      const totalRetailPriceWithTax =
        retailPrice + retailCgstAmount + retailSgstAmount;
      newVariants[index].pricing.totalRetailPriceWithTax = parseFloat(
        totalRetailPriceWithTax.toFixed(2)
      );
    }

    setVariants(newVariants);
  };

  const handleVariationTypeChange = (type) => {
    setSelectedVariationTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const handleVariationValueChange = (index, type, value) => {
    const newVariants = [...variants];
    newVariants[index].attributes[type] = value;
    setVariants(newVariants);
  };

  const handleSupplierIdChange = async (e) => {
    const supplierId = e.target.value;
    setSelectedSupplierId(supplierId);

    const supplier = suppliers.find((sup) => sup.suppid === supplierId);
    if (supplier) {
      setSelectedSupplierName(supplier.name);
      setSupplierConnectionCode(supplier.connectionCode);

      try {
        const response = await fetch(
          `http://localhost:3300/api/suppliers/${supplierId}/active-products`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch active products");
        }
        const activeProducts = await response.json();
        setActiveProducts(activeProducts);
      } catch (error) {
        console.error("Error fetching active products:", error);
        setActiveProducts([]);
      }
    } else {
      setSelectedSupplierName("");
      setSupplierConnectionCode(""); // Clear connection code
      setActiveProducts([]); // Clear products if no supplier is selected
    }
  };

  // Handle Supplier Name change
  const handleSupplierNameChange = async (e) => {
    const supplierName = e.target.value;
    setSelectedSupplierName(supplierName);

    const supplier = suppliers.find((sup) => sup.name === supplierName);
    if (supplier) {
      setSelectedSupplierId(supplier.suppid);
      setSupplierConnectionCode(supplier.connectionCode);

      // Fetch active products for the selected supplier
      try {
        const response = await fetch(
          `http://localhost:3300/api/suppliers/${supplier.suppid}/active-products`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch active products");
        }
        const activeProducts = await response.json();
        setActiveProducts(activeProducts); // Set active products
      } catch (error) {
        console.error("Error fetching active products:", error);
        setActiveProducts([]); // Clear products if there's an error
      }
    } else {
      setSelectedSupplierId("");
      setSupplierConnectionCode(""); // Clear connection code
      setActiveProducts([]); // Clear products if no supplier is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      distributorId,
      supplier: {
        id: selectedSupplierId,
        name: selectedSupplierName,
        connectionCode: supplierConnectionCode, // Ensure this is set
      },
      product: {
        name: productName,
        code: productCode,
        category,
        description,
      },
      variants: variants.map((variant) => ({
        ...variant,
        pricing: {
          buyPriceWithoutTax: variant.pricing.buyPriceWithoutTax,
          buyCgst: variant.pricing.buyCgst,
          buySgst: variant.pricing.buySgst,
          totalBuyPriceWithTax: variant.pricing.totalBuyPriceWithTax,
          retailPriceWithoutTax: variant.pricing.retailPriceWithoutTax,
          retailCgst: variant.pricing.retailCgst,
          retailSgst: variant.pricing.retailSgst,
          totalRetailPriceWithTax: variant.pricing.totalRetailPriceWithTax,
          mrp: variant.pricing.mrp,
        },
        stock: variant.stock,
      })),
      packagingType,
      unitsPerPackage: variants[0]?.stock.unitsPerPackage || 0,
      stocksInPackage: variants[0]?.stock.stocksInPackage || 0,
      leftoverUnits: variants[0]?.stock.leftoverUnits || 0,
      totalAvailableUnits: variants[0]?.stock.totalAvailableUnits || 0,
      returnQuantity: variants[0]?.stock.returnQuantity || 0,
      reorderLevel: variants[0]?.stock.reorderLevel || 0,
    };

    console.log("Payload being sent:", productData);

    try {
      const result = await addProduct(productData);
      console.log("Product added successfully:", result);
      toast.success("Product added successfully!");
      // Reset form after successful submission
      setProductName("");
      setProductCode("");
      setCategory("");
      setDescription("");
      setSelectedSupplierId("");
      setSelectedSupplierName("");
      setSupplierConnectionCode("");
      setVariants([
        {
          attributes: {},
          pricing: {
            buyPriceWithoutTax: 0,
            buyCgst: 0,
            buySgst: 0,
            totalBuyPriceWithTax: 0,
            retailPriceWithoutTax: 0,
            retailCgst: 0,
            retailSgst: 0,
            totalRetailPriceWithTax: 0,
            mrp: 0,
          },
          stock: {
            unitsPerPackage: 0,
            stocksInPackage: 0,
            leftoverUnits: 0,
            totalAvailableUnits: 0,
            returnQuantity: 0,
            reorderLevel: 0,
          },
        },
      ]);
      setSelectedVariationTypes([]);
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        "Error adding product: " +
          (error.response ? error.response.data : error.message)
      ); // Show error notification
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div
        className="content flex-1 p-6 mt-20 bg-white"
        style={{ minHeight: "100vh", marginLeft: "250px" }}
      >
        <Header />
        <h1 className="text-2xl font-bold mb-4">Add Product</h1>
        <form onSubmit={handleSubmit}>
          {/* Distributor ID */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Distributor ID
            </label>
            <input
              type="text"
              value={distributorId}
              readOnly
              className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
              placeholder="Distributor ID"
            />
          </div>

          {/* Supplier Details */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Supplier ID
            </label>
            <select
              value={selectedSupplierId}
              onChange={handleSupplierIdChange}
              className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
              required
            >
              <option value="">Select Supplier ID</option>
              {suppliers.map((supplier) => (
                <option key={supplier.suppid} value={supplier.suppid}>
                  {supplier.suppid}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Supplier Name
            </label>
            <input
              type="text"
              value={selectedSupplierName}
              readOnly
              className="mt-1 p-2 w-full border-2 rounded bg-gray-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Supplier Connection Code
            </label>
            <select
              value={supplierConnectionCode}
              onChange={(e) => setSupplierConnectionCode(e.target.value)}
              className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
            >
              <option value="">Select Connection Code</option>
              {activeProducts.map((product) => (
                <option key={product.connectCode} value={product.connectCode}>
                  {product.name} (Code: {product.connectCode})
                </option>
              ))}
            </select>
          </div>

          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Product Code */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Code
            </label>
            <input
              type="text"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
              className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
              placeholder="Enter product code"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
              placeholder="Enter product category"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
              placeholder="Enter product description"
              required
            />
          </div>

          {/* Packaging Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Packaging Type
            </label>
            <select
              value={packagingType}
              onChange={(e) => setPackagingType(e.target.value)}
              className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
            >
              <option value="Carton">Carton</option>
              <option value="Box">Box</option>
              <option value="Sack">Sack</option>
              <option value="Sheet">Sheet</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Dynamic Variation Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Variation Type
            </label>
            <div className="flex gap-4 flex-wrap">
              {variationTypes.map((type) => (
                <label key={type} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value={type}
                    checked={selectedVariationTypes.includes(type)}
                    onChange={() => handleVariationTypeChange(type)}
                    className="mr-2"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Dynamic Variants Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Variants</h2>
            {variants.map((variant, index) => (
              <div key={index} className="mb-6 border p-4 rounded">
                <h3 className="text-lg font-semibold mb-4">
                  Variant {index + 1}
                </h3>

                {/* Variation Attributes */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Variation Attributes
                  </label>
                  {selectedVariationTypes.map((type) => (
                    <div key={type} className="mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {type}
                      </label>
                      <input
                        type="text"
                        value={variant.attributes[type] || ""}
                        onChange={(e) =>
                          handleVariationValueChange(
                            index,
                            type,
                            e.target.value
                          )
                        }
                        className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
                        placeholder={`Enter ${type}`}
                      />
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  <h4 className="text-md font-semibold mb-2">Pricing</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Buy Price (Without Tax)
                      </label>
                      <input
                        type="number"
                        value={variant.pricing.buyPriceWithoutTax}
                        onChange={(e) =>
                          handleVariantChange(index, "pricing", {
                            ...variant.pricing,
                            buyPriceWithoutTax: parseFloat(e.target.value),
                          })
                        }
                        className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        CGST (%)
                      </label>
                      <input
                        type="number"
                        value={variant.pricing.buyCgst}
                        onChange={(e) =>
                          handleVariantChange(index, "pricing", {
                            ...variant.pricing,
                            buyCgst: parseFloat(e.target.value),
                          })
                        }
                        className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        SGST (%)
                      </label>
                      <input
                        type="number"
                        value={variant.pricing.buySgst}
                        onChange={(e) =>
                          handleVariantChange(index, "pricing", {
                            ...variant.pricing,
                            buySgst: parseFloat(e.target.value),
                          })
                        }
                        className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Total Buy Price (With Tax)
                      </label>
                      <input
                        type="number"
                        value={variant.pricing.totalBuyPriceWithTax}
                        disabled
                        className="mt-1 p-2 w-full border-2 rounded bg-gray-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Retail Pricing */}
                <div className="mb-4">
                  <h4 className="text-md font-semibold mb-2">Retail Pricing</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Retail Price (Without Tax)
                      </label>
                      <input
                        type="number"
                        value={variant.pricing.retailPriceWithoutTax}
                        onChange={(e) =>
                          handleVariantChange(index, "pricing", {
                            ...variant.pricing,
                            retailPriceWithoutTax: parseFloat(e.target.value),
                          })
                        }
                        className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Retail CGST (%)
                      </label>
                      <input
                        type="number"
                        value={variant.pricing.retailCgst}
                        onChange={(e) =>
                          handleVariantChange(index, "pricing", {
                            ...variant.pricing,
                            retailCgst: parseFloat(e.target.value),
                          })
                        }
                        className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Retail SGST (%)
                      </label>
                      <input
                        type="number"
                        value={variant.pricing.retailSgst}
                        onChange={(e) =>
                          handleVariantChange(index, "pricing", {
                            ...variant.pricing,
                            retailSgst: parseFloat(e.target.value),
                          })
                        }
                        className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Total Retail Price (With Tax)
                      </label>
                      <input
                        type="number"
                        value={variant.pricing.totalRetailPriceWithTax}
                        disabled
                        className="mt-1 p-2 w-full border-2 rounded bg-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        MRP
                      </label>
                      <input
                        type="number"
                        value={variant.pricing.mrp}
                        onChange={(e) =>
                          handleVariantChange(index, "pricing", {
                            ...variant.pricing,
                            mrp: parseFloat(e.target.value),
                          })
                        }
                        className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Stock */}
                <div className="mb-4">
                  <h4 className="text-md font-semibold mb-2">Stock</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Units per Package
                      </label>
                      <input
                        type="number"
                        value={variant.stock.unitsPerPackage}
                        onChange={(e) =>
                          handleVariantChange(index, "stock", {
                            ...variant.stock,
                            unitsPerPackage: parseInt(e.target.value),
                          })
                        }
                        className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Stocks in Package
                      </label>
                      <input
                        type="number"
                        value={variant.stock.stocksInPackage}
                        onChange={(e) =>
                          handleVariantChange(index, "stock", {
                            ...variant.stock,
                            stocksInPackage: parseInt(e.target.value),
                          })
                        }
                        className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Leftover Units
                      </label>
                      <input
                        type="number"
                        value={variant.stock.leftoverUnits}
                        onChange={(e) =>
                          handleVariantChange(index, "stock", {
                            ...variant.stock,
                            leftoverUnits: parseInt(e.target.value),
                          })
                        }
                        className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Return Quantity
                      </label>
                      <input
                        type="number"
                        value={variant.stock.returnQuantity}
                        onChange={(e) =>
                          handleVariantChange(index, "stock", {
                            ...variant.stock,
                            returnQuantity: parseInt(e.target.value),
                          })
                        }
                        className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Total Available Units */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Total Available Units
                  </label>
                  <input
                    type="number"
                    value={variant.stock.totalAvailableUnits}
                    disabled
                    className="mt-1 p-2 w-full border-2 rounded bg-gray-200"
                  />
                </div>

                {/* Reorder Level */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Reorder Level
                  </label>
                  <input
                    type="number"
                    value={variant.stock.reorderLevel}
                    onChange={(e) =>
                      handleVariantChange(index, "stock", {
                        ...variant.stock,
                        reorderLevel: parseInt(e.target.value),
                      })
                    }
                    className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
                  />
                </div>

                {/* Remove Variant Button */}
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                >
                  Remove Variant
                </button>
              </div>
            ))}
          </div>

          {/* Add Variant Button */}
          <button
            type="button"
            onClick={addVariant}
            className="mb-6 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Variant
          </button>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded focus:outline-none"
            >
              Add Product
            </button>
          </div>
        </form>
        <ToastContainer /> {/* Add ToastContainer here */}
      </div>
    </div>
  );
};

export default AddProductPage;
