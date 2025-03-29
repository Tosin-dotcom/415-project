
import { NextResponse } from "next/server";

export async function GET() {
  try {
  
    const dashboardData = {
      totalLoans: 124,
      activeLoans: 98,
      overdueLoans: 12,
      totalRepayments: 45678.50,
      recentLoans: [
        {
          id: 1,
          customerName: "John Doe",
          amount: 5000,
          durationMonths: 6,
          startDate: "2025-01-15",
          status: "Active"
        },
        {
          id: 2,
          customerName: "Jane Smith",
          amount: 10000,
          durationMonths: 12,
          startDate: "2025-02-01",
          status: "Active"
        },
        {
          id: 3,
          customerName: "Michael Johnson",
          amount: 3500,
          durationMonths: 6,
          startDate: "2024-12-10",
          status: "Active"
        },
        {
          id: 4,
          customerName: "Sarah Williams",
          amount: 7500,
          durationMonths: 12,
          startDate: "2025-01-05",
          status: "Overdue"
        },
        {
          id: 5,
          customerName: "Robert Brown",
          amount: 2000,
          durationMonths: 6,
          startDate: "2025-02-20",
          status: "Active"
        }
      ],
      overdueAccounts: [
        {
          id: 4,
          customerName: "Sarah Williams",
          amountDue: 1250,
          daysOverdue: 15,
          lastPaymentDate: "2025-01-15"
        },
        {
          id: 8,
          customerName: "David Miller",
          amountDue: 850,
          daysOverdue: 10,
          lastPaymentDate: "2025-02-01"
        },
        {
          id: 12,
          customerName: "Emily Davis",
          amountDue: 500,
          daysOverdue: 5,
          lastPaymentDate: "2025-02-07"
        },
        {
          id: 15,
          customerName: "Thomas Wilson",
          amountDue: 2000,
          daysOverdue: 25,
          lastPaymentDate: null
        }
      ]
    };

    return NextResponse.json({
      success: true,
      dashboardData
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}