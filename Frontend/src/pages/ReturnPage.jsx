// ReturnsPage.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const ReturnsPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="content flex-1 p-6 mt-20 ml-60">
        <Header />
        <h1 className="text-3xl font-bold mb-4">Returns Page</h1>
        <p className="mb-4">
          This is the Returns page where you can manage product returns.
        </p>
        {/* Add your returns management logic here */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Manage Returns</h2>
          <p>Here you can view and process returns for your products.</p>
          {/* You can add a table or form here to manage returns */}
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;
