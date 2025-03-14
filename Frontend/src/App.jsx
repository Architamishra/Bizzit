// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Login & Sign-in Pages
import LoginButton from "./pages/Login/LoginButton";
import LoginDistributor from "./pages/Login/LoginDistributor";
import LoginRetailer from "./pages/Login/LoginRetailer";
import SignIn1 from "./pages/Signin/SignIn1";
import Register from "./pages/Signin/Register";
import Register1 from "./pages/Signin/Register1";
import Register3 from "./pages/Signin/Register3";
import Register4 from "./pages/Signin/Register4";
import NewRegistration from "./pages/Signin/NewRegistration";

// General Pages
import SplashScreen from "./components/SplashScreen";
import Dashboard from "./pages/Dashboard";
import StockPage from "./pages/StockPage";
import AddProductPage from "./pages/AddProductPage";
import InventoryPage from "./pages/InventoryPage";
import OrdersPage from "./pages/OrdersPage";
import CustomersPage from "./pages/CustomersPage";
import SuppliersPage from "./pages/SuppliersPage";
import SupplierAdd from "./pages/SupplierAdd";
import PaymentsPage from "./pages/PaymentsPage";
import ProfilePage from "./pages/ProfilePage";
import UpdateInventoryForm from "./pages/UpdateInventoryForm";
import UpdateStockForm from "./pages/UpdateStockForm";
import ReturnsPage from "./pages/ReturnPage";
import CustomerOrders from "./pages/CustomerOrders";
// Retailer Pages
import RetailerDashboard from "./pages/Retailer/RetailerDashboard";
import OrderProductsPage from "./pages/Retailer/OrderProductsPage";
import ViewDistributorsPage from "./pages/Retailer/ViewDistributorsPage";
import RetailerPaymentsPage from "./pages/Retailer/RetailerPaymentsPage";
import RetailerProfilePage from "./pages/Retailer/RetailerProfilePage";
import ProductPage from "./pages/Retailer/Pro";
import CartPage from "./pages/Retailer/AddToCart";

//Admin Pages
import AdminLogin from "./pages/Login/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
//import AdminDashboard from "./pages/Admin/AdminDashboard";
import ViewUsers from "./pages/Admin/ViewUsers";
import Logs from "./pages/Admin/Logs";
//import Logout from "./pages/Admin/Logout";
import ViewDistributors from "./pages/Admin/AdminDistributor";
import ViewRetailers from "./pages/Admin/AdminRetailer";
import DistributorDetails from "./pages/Admin/DistributorDetails";
import RetailerDetails from "./pages/Admin/RetailerDetails";
import ReturnPage from "./pages/Retailer/ReturnRetailerPage";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000); // Showing splash for 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <Routes>
          {/* Authentication Routes */}
          <Route path="/" element={<LoginButton />} />
          <Route path="/logindistributor" element={<LoginDistributor />} />
          <Route path="/loginretailer" element={<LoginRetailer />} />
          <Route path="/signin" element={<SignIn1 />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register1" element={<Register1 />} />
          <Route path="/register3" element={<Register3 />} />
          <Route path="/register4" element={<Register4 />} />
          <Route path="/new-registration" element={<NewRegistration />} />
          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />{" "}
          {/* Add this line */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />{" "}
          {/* Add this line */}
          <Route path="/view-users" element={<ViewUsers />} />{" "}
          {/* Add this line */}
          <Route path="/logs" element={<Logs />} /> {/* Add this line */}
          {/*<Route path="/logout" element={<Logout />} /> */}
          <Route
            path="/view-distributors"
            element={<ViewDistributors />}
          />{" "}
          {/* Add this line */}
          <Route path="/view-retailers" element={<ViewRetailers />} />{" "}
          {/* Add this line */}
          <Route
            path="/distributor-details/:id"
            element={<DistributorDetails />}
          />{" "}
          {/* Add this line */}
          <Route
            path="/retailer-details/:id"
            element={<RetailerDetails />}
          />{" "}
          {/* Add this line */}
          {/* Distributor Routes */}
          <Route path="/distributor-dashboard" element={<Dashboard />} />
          <Route path="/stock" element={<StockPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/customer-orders/:id" element={<CustomerOrders />} />
          <Route path="/returns" element={<ReturnsPage />} />{" "}
          {/* Add this line */}
          <Route path="/suppliers" element={<SuppliersPage />} />
          <Route path="/add-supplier" element={<SupplierAdd />} />
          <Route path="/payments/bills" element={<PaymentsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/inventory/update/:id"
            element={<UpdateInventoryForm />}
          />
          <Route path="/stock/update/:id" element={<UpdateStockForm />} />
          {/* Retailer Routes */}
          <Route
            path="/retailer/retailer-dashboard"
            element={<RetailerDashboard />}
          />
          <Route
            path="/retailer/order-products"
            element={<OrderProductsPage />}
          />
          <Route
            path="/retailer/view-distributors"
            element={<ViewDistributorsPage />}
          />
          <Route path="/retailer/payments" element={<RetailerPaymentsPage />} />
          <Route path="/retailer/profile" element={<RetailerProfilePage />} />
          <Route path="/pro/:distributorId" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/retailer/returns" element={<ReturnPage />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
