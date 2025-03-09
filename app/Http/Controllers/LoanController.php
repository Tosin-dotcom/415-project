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

    public function index()
    {
        $loans = $this->loanService->getUserLoans(Auth::id());

        return response()->json([
            'data' => $loans
        ]);
    }

    public function makePayment(Request $request, $loanId)
    {
        $validated = $request->validate([
            'amount_paid' => 'required|numeric|min:1',
        ]);

        $loan = $this->loanService->recordPayment($loanId, $validated['amount_paid']);

        return response()->json(['message' => 'Payment recorded successfully', 'loan' => $loan]);
    }

}
