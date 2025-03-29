"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import SideNav from "../components/SideNav";
import LoanModal from "../components/LoanModal";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "defaulted":
        return "bg-red-100 text-red-800";
      case "partial":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-yellow-100 text-yellow-800";
      case "overpaid":
        return "bg-purple-100 text-purple-800"; 
      default:
        return "bg-gray-100 text-gray-800";
    }
};


  const fetchLoans = async () => {
    setIsLoading(true);
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.get(
        `${API_URL}/api/loans/${userId}`
      );
      setLoans(response.data.data);
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchLoans(); 
  };

  const handleViewHistory = (loanId) => {
    router.push(`/loans/${loanId}`);
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const calculateProgress = (totalAmount, amountPaid) => {
    return Math.round((amountPaid / totalAmount) * 100);
  };

  return (
    <section className="flex h-screen bg-gray-50">
      <SideNav />
      <div className="w-full overflow-y-auto">
      <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold text-gray-800">Loan Management</h1>
             
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Loans</h2>
              <p className="text-gray-500 mt-1">Manage and track all your loans</p>
            </div>
            <button
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition duration-200 ease-in-out flex items-center shadow-md"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="mr-2">+</span> New Loan
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Loan Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Monthly Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Timeline
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {loans.length > 0 ? (
                      loans.map((loan) => {
                        const progressPercentage = calculateProgress(loan.total_amount_to_pay, loan.total_paid);
                        const remainingBalance = loan.total_amount_to_pay - loan.total_paid;
                        
                        return (
                          <tr key={loan.id} className="hover:bg-gray-50 transition duration-150">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                  <span className="text-gray-600 font-medium">
                                    {loan.customer_name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{loan.customer_name}</div>
                                  <div className="text-sm text-gray-500">ID: {loan.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">₦{loan.amount.toLocaleString()}</div>
                              <div className="text-sm text-gray-500">Total: ₦{loan.total_amount_to_pay.toLocaleString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-1 h-2 bg-gray-200 rounded-full mr-2">
                                  <div 
                                    className="h-full bg-blue-600 rounded-full" 
                                    style={{ width: `${progressPercentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-500">{progressPercentage}%</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                ₦{loan.total_paid.toLocaleString()} paid / ₦{remainingBalance.toLocaleString()} left
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">${loan.amount_per_month.toLocaleString()}/month</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{loan.repayment_plan} months</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-3 py-1 text-xs font-medium rounded-full 
                                ${
                                  getStatusBadgeStyle(loan.status)
                                }`}
                              >
                                {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                <span className="font-medium">Start:</span> {new Date(loan.start_date).toLocaleDateString()}
                              </div>
                              <div className="text-sm text-gray-500">
                                <span className="font-medium">End:</span> {new Date(
                                  new Date(loan.start_date).setMonth(
                                    new Date(loan.start_date).getMonth() +
                                      loan.repayment_plan
                                  )
                                ).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleViewHistory(loan.id)}
                                className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition duration-150"
                              >
                                View History
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="8" className="px-6 py-10 text-center text-gray-500">
                          <div className="flex flex-col items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <p className="text-lg font-medium">No loans found</p>
                            <p className="text-sm text-gray-500 mt-1">Get started by creating a new loan</p>
                            <button
                              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition duration-200 ease-in-out"
                              onClick={() => setIsModalOpen(true)}
                            >
                              Create New Loan
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <LoanModal isOpen={isModalOpen} onClose={handleModalClose} />
    </section>
  );
}