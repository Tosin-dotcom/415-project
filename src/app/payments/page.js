"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import SideNav from "../components/SideNav";
import PaymentModal from "../components/PaymentModal";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchPayments();
  };

  const fetchPayments = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/loans/payment/${userId}`);
      setPayments(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching payments:", error);
      setError("Failed to load payments. Please try again.");
      setLoading(false);
    }
  };

  const filteredPayments = payments.filter(payment => 
    payment.customer_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status) => {
    if (!status) return "bg-blue-100 text-blue-700";
    
    switch(status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "late":
        return "bg-red-100 text-red-700";
      case "ongoing":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section className="flex min-h-screen bg-gray-50">
      <SideNav />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold text-gray-800">Loan Management</h1>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by customer name..."
                    className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Payment History</h2>
                <button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-150 ease-in-out flex items-center"
                  onClick={() => setIsModalOpen(true)}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Record Payment
                </button>
              </div>

              {loading ? (
                <div className="p-6 text-center">
                  <div className="animate-pulse flex justify-center">
                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ) : error ? (
                <div className="p-6 text-center text-red-600">{error}</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount Paid
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPayments.length > 0 ? (
                        filteredPayments.map((payment) => (
                          <tr key={payment.id} className="hover:bg-gray-50 transition duration-150">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {payment.payment_date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {payment.customer_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ₦{payment.amount_paid.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(payment.status)}`}>
                                {payment.status || "On Track"}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="px-6 py-10 text-center text-sm text-gray-500">
                            {searchTerm ? (
                              <div>
                                <p className="font-medium">No results found for "{searchTerm}"</p>
                                <p className="mt-1">Try adjusting your search query</p>
                              </div>
                            ) : (
                              <div>
                                <p className="font-medium">No payments recorded yet</p>
                                <p className="mt-1">Payments will appear here once recorded</p>
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
              
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Showing {filteredPayments.length} of {payments.length} payments
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <PaymentModal isOpen={isModalOpen} onClose={handleModalClose} />
    </section>
  );
}