const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const InventoryRouter = require("./Routes/InventoryRouter");
const StockRouter = require("./Routes/StockRouter");
const InventoryViewRouter = require("./Routes/InventoryViewRouter");
const AddSupplierRouter = require("./Routes/AddSupplierRouter");
const AuthRouter = require("./Routes/AuthRouter");
const loginRouter = require("./Routes/loginRouter");
const productRouter = require("./Routes/productRouter");
const distributorRoutes = require("./Routes/distributorRoutes");
const connectionRoutes = require("./Routes/connectionRoutes.js");
const UpdateDistributor = require("./Routes/UpdateDistributorRouter.js");
const UpdateRetailerRouter = require("./Routes/UpdateRetailerRouter.js");
const DistributorViewOrder = require("./Routes/DistributorViewOrder");
const OrderStatus = require("./Routes/OrderStatus");
const AdminLogin = require("./Routes/Adminlogin");
const AdminViewUser = require("./Routes/AdminViewUser");
const DistributorDetailsRouter = require("./Routes/AdminDistributor"); // Import the new route
const RetailerDetailsRouter = require("./Routes/AdminRetailer"); // Import the new route
const viewCustomerRoutes = require("./Routes/ViewCustomer");
const CustomerOrder = require("./Routes/CustomerOrder");
const orderRoutes = require("./Routes/orderRoutes");
const cartRoutes = require("./Routes/cartRoutes");
const orderViewRoutes = require("./Routes/orderViewRoutes");
const returnRoutes = require("./Routes/returnRoutes");
const connectRoutes = require("./Routes/ConnectRoutes");
const connectionRoutes2 = require("./Routes/ConnectionRoutes2");
const returnRetailerRoutes = require("./Routes/returnRetailerRoutes");
const logoutRoutes = require("./Routes/logoutRoutes");
const logsRoutes = require("./Routes/logsRoutes");
const logs2Routes = require("./Routes/logs2Routes");
const distributorPaymentRoutes = require("./Routes/distributorPaymentRoutes");
const SubscriptionRoutes = require("./Routes/SubscriptionRoutes");

require("dotenv").config();
require("./Models/db"); // ✅ Ensure database connection

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Inventory-related routes
app.use("/api/inventory", InventoryRouter);
app.use("/api/inventory", InventoryViewRouter);
app.use("/api/distributor", DistributorViewOrder);
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`); // Log the HTTP method and URL
  next();
});

// Use the order routes
app.use("/api/distributor", OrderStatus);

// Stock routes
app.use("/api/stock", StockRouter);

// Supplier routes
app.use("/api/suppliers", AddSupplierRouter);

// Authentication routes
app.use("/auth", AuthRouter);
app.use("/login", loginRouter);
app.use("/login/admin", AdminLogin);

//admin
app.use("/api/admin", AdminViewUser);
app.use("/api/distributor-details", DistributorDetailsRouter);
app.use("/api/retailer-details", RetailerDetailsRouter);
app.use("/api/subscription", SubscriptionRoutes);

// Product routes
app.use("/api/products", productRouter); // 👈 All product-related routes under /api/products

// Distributor routes (includes product listing for a distributor)
app.use("/api/distributors", distributorRoutes);
app.use("/api/connections", connectionRoutes);
app.use("/api/v1/retailers", viewCustomerRoutes);
app.use("/api/v1/orders", CustomerOrder);

//Retailer
app.use("/api/retailer", UpdateRetailerRouter);

app.use("/api/distributors/update", UpdateDistributor);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orderView", orderViewRoutes);
app.use("/api/returns", returnRoutes);
app.use("/api/connect", connectRoutes);
app.use("/api/connect2", connectionRoutes2);
app.use("/api/returns", returnRetailerRoutes);
app.use("/api", logoutRoutes);
app.use("/api/logs", logsRoutes);
app.use("/api/logs", logs2Routes);
app.use("/api/distributor-payments", distributorPaymentRoutes);

// 🚀 Server Start
const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
