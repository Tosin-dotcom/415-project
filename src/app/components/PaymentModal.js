"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentModal({ isOpen, onClose }) {
  const [loadId, setLoadId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  

  useEffect(() => {
    if (isOpen) {
      fetchLoans();
      setPaymentDate(formatDate(new Date()));
      setError(null);
      setSuccess(false);
    }
  }, [isOpen]);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const fetchLoans = async () => {
    const userId = localStorage.getItem("userId");
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/api/loans/${userId}`
      );
      setLoans(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching loans:", error);
      setError("Failed to load debtors. Please try again.");
      setLoading(false);
    }
  };

  const handlePaymentSubmit = async (e) => {
    const userId = localStorage.getItem("userId");
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const payload = {
      amount_paid: parseFloat(amount),
      payment_date: paymentDate,
    };

    try {
      await axios.post(`${API_URL}/api/loans/payment/${loadId}/${userId}`, payload);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        // Reset form
        setLoadId("");
        setAmount("");
      }, 1500);
    } catch (error) {
      console.error("Error saving payment:", error);
      setError("Failed to record payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const getSelectedLoan = () => {
    return loans.find(loan => loan.id === loadId);
  };

  const selectedLoan = getSelectedLoan();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md transform transition-all">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Record Payment</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none p-1"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mt-4 p-3 bg-green-100 border border-green-200 text-green-700 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Payment recorded successfully!</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{error}</span>
          </div>
        )}

      
        <form className="mt-6 space-y-6" onSubmit={handlePaymentSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Debtor</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={loadId}
              onChange={(e) => setLoadId(e.target.value)}
              required
              disabled={loading}
            >
              <option value="">Select a debtor</option>
              {loans.map((loan) => (
                <option key={loan.id} value={loan.id}>
                  {loan.customer_name} (Balance: ₦{(loan.total_amount_to_pay - loan.total_paid).toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          {selectedLoan && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800">Loan Details</h4>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <div>
                  <span className="text-gray-600">Total Amount:</span>
                  <p className="font-medium">₦{selectedLoan.total_amount_to_pay.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Amount Paid:</span>
                  <p className="font-medium">₦{selectedLoan.total_paid.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Outstanding:</span>
                  <p className="font-medium text-red-600">
                    ₦{(selectedLoan.total_amount_to_pay - selectedLoan.total_paid).toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Interest Rate:</span>
                  <p className="font-medium">{selectedLoan.interest_rate}%</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Amount</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">₦</span>
              </div>
              <input
                type="number"
                className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                disabled={loading}
                min="0.01"
                step="0.01"
              />
            </div>
            {selectedLoan && parseFloat(amount) > (selectedLoan.total_amount_to_pay - selectedLoan.total_paid) && (
              <p className="text-xs text-yellow-600 mt-1">
                Warning: Payment amount exceeds outstanding balance
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
              disabled={loading || !loadId || !amount || !paymentDate}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Record Payment"
              )}
            </button>
          </div>
        </form>

        <div className="mt-4 pt-3 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full text-gray-600 hover:text-gray-800 p-2 rounded-lg transition-all text-sm"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}