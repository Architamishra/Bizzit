import React, { useState, useEffect } from "react";
import { addSupplier } from "../api/SupplierApi";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const SupplierAdd = () => {
  const [distributorId, setDistributorId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([
    { name: "", description: "", price: "" },
  ]);

  const categories = [
    "Grocery & Staples",
    "Dairy & Eggs",
    "Beverages",
    "Snacks & Packaged Foods",
    "Fruits & Vegetables",
    "Personal Care",
    "Household Essentials",
    "Bakery & Breads",
    "Baby Care",
    "Health & Wellness",
    "Frozen & Ready-to-Eat",
    "Cleaning & Laundry",
    "Pulses & Lentils",
    "Cooking Oils & Ghee",
    "Spices & Condiments",
    "Tea, Coffee & Juices",
    "Chocolates & Sweets",
    "Dry Fruits & Nuts",
    "Pet Care",
    "Stationery & School Supplies",
    "Kitchen & Dining",
    "Toiletries & Bath Essentials",
    "Hair Care",
    "Skin Care",
    "Oral Care",
    "Men's Grooming",
    "Home & Decor",
    "Pooja Samagri",
    "Plasticware & Storage",
    "Electrical & Batteries",
    "Others",
  ];

  useEffect(() => {
    const storedDistributorId = localStorage.getItem("register1");
    if (storedDistributorId) {
      setDistributorId(storedDistributorId);
    }
  }, []);

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const newProducts = [...products];
    newProducts[index][name] = value;
    setProducts(newProducts);
  };

  const addProduct = () => {
    setProducts([...products, { name: "", description: "", price: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const supplierData = {
      distributorId,
      name,
      email,
      phone,
      address,
      category,
      products,
    };

    try {
      const result = await addSupplier(supplierData);
      console.log("Supplier added successfully:", result);
      toast.success("Supplier added successfully!");

      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setCategory("");
      setProducts([{ name: "", description: "", price: "" }]);
    } catch (error) {
      console.error("Error adding supplier:", error);
      toast.error(
        "Error adding supplier: " +
          (error.response ? error.response.data : error.message)
      ); // Show error notification
    }
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Render the Sidebar */}
      <div
        className="content flex-1 p-6 mt-20 bg-white"
        style={{ minHeight: "100vh", marginLeft: "250px" }}
      >
        <Header /> {/* Render the Header */}
        <h1 className="text-2xl font-bold mb-4">Add Supplier</h1>
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
          {/* Supplier Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Supplier Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
              placeholder="Enter supplier name"
            />
          </div>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
              placeholder="Enter supplier email"
            />
          </div>
          {/* Phone */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
              placeholder="Enter supplier phone"
            />
          </div>
          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
              placeholder="Enter supplier address"
            />
          </div>
          {/* Category Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          {/* Products Section */}
          <h3 className="text-lg font-semibold mb-2">Products</h3>
          {products.map((product, index) => (
            <div key={index} className="mb-4 border p-4 rounded">
              <h4 className="font-medium">Product {index + 1}</h4>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={(e) => handleProductChange(index, e)}
                  required
                  className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
                  placeholder="Enter product name"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={product.description}
                  onChange={(e) => handleProductChange(index, e)}
                  required
                  className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
                  placeholder="Enter product description"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={(e) => handleProductChange(index, e)}
                  required
                  className="mt-1 p-2 w-full border-2 rounded focus:outline-none"
                  placeholder="Enter product price"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addProduct}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Another Product
          </button>
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded focus:outline-none"
            >
              Add Supplier
            </button>
          </div>
        </form>
        <ToastContainer /> {/* Add ToastContainer here */}
      </div>
    </div>
  );
};

export default SupplierAdd;
