"use client";
import { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import { FaUsers, FaExclamationTriangle, FaMoneyBillWave, FaCalendarCheck, FaDollarSign, FaHandHoldingUsd } from "react-icons/fa";
import axios from "axios";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    total_loans: 0,
    active_loans: 0,
    overdue_loans: 0,
    total_repayments: 0,
    recent_loans: [],
    overdue_accounts: [],
    total_loans_given: 0,
    total_amount_collected: 0,
  });

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [isLoading, setIsLoading] = useState(true);
  
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

  

  useEffect(() => {
    
    const fetchDashboardData = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get(`${API_URL}/api/dashboard/${userId}`);
        setDashboardData(response.data.data || {});
      } catch (error) {
        console.error("Error fetching dashboard data:", error.response ? error.response.data : error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNav />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard 
                  title="Total Loans" 
                  value={dashboardData.total_loans.toLocaleString()} 
                  icon={<FaUsers className="text-blue-500" size={24} />} 
                  bgColor="bg-blue-100"
                />
                <StatCard 
                  title="Active Loans" 
                  value={dashboardData.active_loans.toLocaleString()} 
                  icon={<FaCalendarCheck className="text-green-500" size={24} />} 
                  bgColor="bg-green-100"
                />
                <StatCard 
                  title="Overdue Loans" 
                  value={dashboardData.overdue_loans ? dashboardData.overdue_loans.toLocaleString() : 0} 
                  icon={<FaExclamationTriangle className="text-red-500" size={24} />} 
                  bgColor="bg-red-100"
                />
                <StatCard 
                  title="Total Repayments" 
                  value={`₦${dashboardData.total_repayments ? dashboardData.total_repayments.toLocaleString() : 0}`} 
                  icon={<FaMoneyBillWave className="text-emerald-500" size={24} />} 
                  bgColor="bg-emerald-100"
                />
                <StatCard 
                  title="Total Loans Given" 
                  value={`₦${dashboardData.total_loans_given.toLocaleString()}`} 
                  icon={<FaDollarSign className="text-yellow-500" size={24} />} 
                  bgColor="bg-yellow-100"
                />
                <StatCard 
                  title="Total Amount Collected" 
                  value={`₦${dashboardData.total_amount_collected.toLocaleString()}`} 
                  icon={<FaHandHoldingUsd className="text-purple-500" size={24} />} 
                  bgColor="bg-purple-100"
                />
              </div>

              
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Recent Loans</h2>
                {dashboardData.recent_loans.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dashboardData.recent_loans.map((loan) => (
                          <tr key={loan.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{loan.customer_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">₦{loan.amount.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{loan.repayment_plan} months</td>
                            <td className="px-6 py-4 whitespace-nowrap">{new Date(loan.start_date).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeStyle(loan.status)}`}>
                                {loan.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">No recent loans to display.</p>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, bgColor }) {
  return (
    <div className={`${bgColor} rounded-lg shadow-md p-6`}>
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-4">{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
