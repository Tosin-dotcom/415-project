<?php

namespace App\Http\Controllers;

use App\Services\LoanService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoanController extends Controller
{
    protected $loanService;

    public function __construct(LoanService $loanService)
    {
        $this->loanService = $loanService;
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_name' => 'required|string',
            'amount' => 'required|numeric|min:1000',
            'repayment_plan' => 'required|in:6,12',
            'start_date' => 'required|date',
        ]);

        $loan = $this->loanService->createLoan($request->all(), Auth::id());

        return response()->json([
            'message' => 'Loan successfully created',
            'data' => $loan
        ], 201);
    }

    public function index($userId)
    {
        $loans = $this->loanService->getUserLoans($userId);

        return response()->json([
            'data' => $loans
        ]);
    }


    public function makePayment(Request $request, $loanId)
    {
        $validated = $request->validate([
            'amount_paid' => 'required|numeric|min:1',
            'payment_date' => 'required|date',
        ]);

        $loan = $this->loanService->recordPayment($loanId, $validated['amount_paid'], $validated['payment_date']);

        return response()->json(['message' => 'Payment recorded successfully', 'loan' => $loan]);
    }

    public function getDistinctCustomerNames($userId)
    {

        $customerNames = $this->loanService->getCustomerNamesByUserId($userId);
        return response()->json([
            'data' => $customerNames
        ], 200);
    }


    public function getPaymentsByUser($userId)
    {
        $payments = $this->loanService->getPaymentsByUser($userId);
        return response()->json([
            'data' => $payments
        ], 200);
    }

    public function getLoanHistory($loanId)
    {
        $result = $this->loanService->getLoanHistory($loanId);

        return response()->json([
            'success' => true,
            'data' => $result
        ], 200);
    }

    public function getDashboardData($userId)
    {
        $dashboardData = $this->loanService->getDashboardData($userId);

        return response()->json([
            'success' => true,
            'data' => $dashboardData
        ]);
    }


}
