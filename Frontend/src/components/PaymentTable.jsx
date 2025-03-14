import React from "react";
import { FaArrowRight } from "react-icons/fa"; 

const PaymentTable = () => {
  return (
    <div className="payments-table bg-white shadow-lg rounded-lg overflow-hidden p-4 mt-6">
      <h3 style={{ fontSize: '25px', fontWeight: 'bold', marginBottom: '5px', marginTop: '-15px' }}>
        Payment Status
      </h3>
      <table className="min-w-full table-auto">
        <thead className="bg-lilac-100 text-white">
          <tr>
            <th className="p-4 text-left">Retailer Name</th>
            <th className="p-4 text-left">Amount</th>
            <th className="p-4 text-left">Due Date</th>
            <th className="p-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-lilac-50 transition-colors">
            <td className="p-4 border-none">Ram ji General Store</td>
            <td className="p-4 border-none">500 Rs</td>
            <td className="p-4 border-none">20th Jan 2025</td>
            <td className="p-4 border-none">
              <span className="bg-yellow-400 text-white py-1 px-3 rounded-full">Pending</span>
            </td>
          </tr>
          <tr className="hover:bg-lilac-50 transition-colors">
            <td className="p-4 border-none">Shop A</td>
            <td className="p-4 border-none">300 Rs</td>
            <td className="p-4 border-none">22nd Jan 2025</td>
            <td className="p-4 border-none">
              <span className="bg-yellow-400 text-white py-1 px-3 rounded-full">Pending</span>
            </td>
          </tr>
          <tr className="hover:bg-lilac-50 transition-colors">
            <td className="p-4 border-none">Super Mart</td>
            <td className="p-4 border-none">700 Rs</td>
            <td className="p-4 border-none">25th Jan 2025</td>
            <td className="p-4 border-none">
              <span className="bg-yellow-400 text-white py-1 px-3 rounded-full">Pending</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="view-more-container">
        <button className="view-more-btn">
          View More <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default PaymentTable;
