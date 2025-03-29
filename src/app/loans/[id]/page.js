"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import SideNav from "@/app/components/SideNav";

export default function Page() {
  const params = useParams();
  const { id } = params;

  const [loanData, setLoanData] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "late":
        return "bg-red-100 text-red-800";
      case "partial":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const fetchLoanHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/api/loans/history/${id}`
      );
      setLoanData(response.data.data.loan);
      setPaymentHistory(response.data.data.payments);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching loans:", error);
      setError("Failed to load loan data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchLoanHistory();
    }
  }, [id]);

  if (loading) {
    return (
      <section className="flex h-screen bg-gray-50">
        <SideNav />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-lg text-gray-600">Loading loan data...</p>
        </div>
      </section>
    );
  }

  if (error || !loanData) {
    return (
      <section className="flex h-screen bg-gray-50">
        <SideNav />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-lg text-red-600">
            {error || "Loan data not found"}
          </p>
        </div>
      </section>
    );
  }

  const progressPercentage = Math.floor(
    (loanData.total_paid / loanData.total_amount_to_pay) * 100
  );

  return (
    <section className="flex h-screen bg-gray-50">
      <SideNav />

      <div className="flex-1 bg-gray-50 min-h-screen py-8 px-4 overflow-auto">

        
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md w-full">
          <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Loan Payment History
            </h2>
            <div className="text-right mt-2 md:mt-0">
              <p className="text-sm font-medium text-gray-700">
                Loan ID: <span className="text-gray-900">{loanData.id}</span>
              </p>
              <p className="text-sm font-medium text-gray-700">
                Customer:{" "}
                <span className="text-gray-900">{loanData.customer_name}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-50">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">
                Loan Amount:
              </span>
              <span className="text-sm font-semibold text-gray-900">
                ₦{loanData.amount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">
                Interest Rate:
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {loanData.interest_rate}% ({loanData.repayment_plan})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">
                Start Date:
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {loanData.start_date}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">
                End Date:
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {
                  new Date(
                    new Date(loanData.start_date).setMonth(
                      new Date(loanData.start_date).getMonth() + 6
                    )
                  )
                    .toISOString()
                    .split("T")[0]
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">
                Monthly Payment:
              </span>
              <span className="text-sm font-semibold text-gray-900">
                ₦{loanData.amount_per_month.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">
                Total Amount Due:
              </span>
              <span className="text-sm font-semibold text-gray-900">
                ₦
                {(
                  loanData.total_amount_to_pay - loanData.total_paid
                ).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="px-6 py-4">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-700">
                Repayment Progress:
              </p>
              <p className="text-sm font-medium text-gray-700">
                {progressPercentage}% complete
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="px-6 py-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Payment ₦
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Due Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Payment Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount Due
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount Paid
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentHistory.length > 0 ? (
                  paymentHistory.map((payment, index) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.due_date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.payment_date || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₦{loanData.amount_per_month - payment.amount_paid}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₦{payment.amount_paid.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeStyle(
                            payment.status
                          )}`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₦{payment.balance.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No payment history available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-200 px-6 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-xs text-gray-500">Total Loan Amount</p>
                <p className="text-lg font-bold text-gray-900">
                  ₦{loanData.amount.toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Total Interest</p>
                <p className="text-lg font-bold text-gray-900">
                  ₦
                  {(
                    loanData.total_amount_to_pay - loanData.amount
                  ).toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Total Paid</p>
                <p className="text-lg font-bold text-gray-900">
                  ₦{loanData.total_paid.toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Outstanding Balance</p>
                <p className="text-lg font-bold text-gray-900">
                  ₦
                  {(
                    loanData.total_amount_to_pay - loanData.total_paid
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
