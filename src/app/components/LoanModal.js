import { useState, useEffect } from "react";
import axios from "axios";

export default function LoanModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    amount: "",
    repaymentPlan: "",
    startDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const api = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, startDate: today }));
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName)
      newErrors.customerName = "Customer name is required";
    if (!formData.amount) newErrors.amount = "Loan amount is required";
    else if (isNaN(formData.amount) || Number(formData.amount) <= 0)
      newErrors.amount = "Please enter a valid amount";
    if (!formData.repaymentPlan)
      newErrors.repaymentPlan = "Please select a repayment plan";
    if (!formData.startDate) newErrors.startDate = "Start date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const loanPayload = {
      customer_name: formData.customerName,
      amount: Number(formData.amount),
      repayment_plan: Number(formData.repaymentPlan),
      start_date: formData.startDate,
      user_id: localStorage.getItem("userId"),
    };

    try {
      const response = await api.post(`/api/loans`, loanPayload);
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error("Error registering loan:", error);
      setErrors({
        submit: error.response?.data?.message || "Failed to register loan",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl sm:align-middle">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-blue-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
              <svg
                className="w-6 h-6 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3
                className="text-xl font-medium leading-6 text-gray-900"
                id="modal-title"
              >
                Create New Loan
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Complete the form below to register a new loan. All fields
                  marked with * are required.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.submit && (
                <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">
                  {errors.submit}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="customerName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Customer Name *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="customerName"
                      id="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 placeholder-gray-400 border ${
                        errors.customerName
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      placeholder="John Doe"
                    />
                    {errors.customerName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.customerName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="customer@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Start Date *
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="startDate"
                        id="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className={`block w-full px-3 py-2 border ${
                          errors.startDate
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      />
                      {errors.startDate && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.startDate}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="amount"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Loan Amount *
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">₦</span>
                      </div>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className={`block w-full pl-7 pr-12 py-2 border ${
                          errors.amount ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                        placeholder="0.00"
                        aria-describedby="price-currency"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span
                          className="text-gray-500 sm:text-sm"
                          id="price-currency"
                        >
                          NGN
                        </span>
                      </div>
                    </div>
                    {errors.amount && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.amount}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="repaymentPlan"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Repayment Plan *
                    </label>
                    <div className="mt-1">
                      <select
                        id="repaymentPlan"
                        name="repaymentPlan"
                        value={formData.repaymentPlan}
                        onChange={handleChange}
                        className={`block w-full px-3 py-2 border ${
                          errors.repaymentPlan
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      >
                        <option value="" disabled>
                          Select a plan
                        </option>
                        <option value="6">6 months (10% interest)</option>
                        <option value="12">12 months (15% interest)</option>
                      </select>
                      {errors.repaymentPlan && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.repaymentPlan}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {formData.amount && formData.repaymentPlan && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-800">
                    Loan Summary
                  </h4>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">Principal amount:</div>
                    <div className="text-gray-900 font-medium">
                    ₦{Number(formData.amount).toLocaleString()}
                    </div>

                    <div className="text-gray-500">Interest rate:</div>
                    <div className="text-gray-900 font-medium">
                      {formData.repaymentPlan === "6" ? "10%" : "15%"}
                    </div>

                    <div className="text-gray-500">Interest amount:</div>
                    <div className="text-gray-900 font-medium">
                    ₦
                      {(
                        Number(formData.amount) *
                        (formData.repaymentPlan === "6" ? 0.1 : 0.15)
                      ).toLocaleString()}
                    </div>

                    <div className="text-gray-500">Total repayment:</div>
                    <div className="text-gray-900 font-medium">
                    ₦
                      {(
                        Number(formData.amount) *
                        (1 + (formData.repaymentPlan === "6" ? 0.1 : 0.15))
                      ).toLocaleString()}
                    </div>

                    <div className="text-gray-500">Monthly payment:</div>
                    <div className="text-gray-900 font-medium">
                    ₦
                      {(
                        (Number(formData.amount) *
                          (1 + (formData.repaymentPlan === "6" ? 0.1 : 0.15))) /
                        Number(formData.repaymentPlan)
                      ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {" "}
                  Register Loan{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
