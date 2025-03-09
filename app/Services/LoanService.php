<?php

namespace App\Services;

use App\Repositories\LoanRepository;
use App\Repositories\LoanPaymentRepository;

class LoanService
{
    protected $loanRepository;
    protected $loanPaymentRepository;



    public function __construct(LoanRepository $loanRepository, LoanPaymentRepository $loanPaymentRepository)
    {
        $this->loanRepository = $loanRepository;
        $this->loanPaymentRepository = $loanPaymentRepository;
    }

    public function createLoan(array $data, $userId)
    {   
        $interestRate = $data['repayment_plan'] == 6 ? 0.10 : 0.15;
        $totalAmountToPay = $data['amount'] + ($data['amount'] * $interestRate);
        $data['total_amount_to_pay'] = $totalAmountToPay;
        $data['user_id'] = $userId;
        $data['amount_per_month'] = $totalAmountToPay / $data['repayment_plan']; 
        $data['interest_rate'] = $interestRate * 100;
        $data['total_paid'] = 0;
    
        return $this->loanRepository->create($data);
    }

    public function getUserLoans($userId)
    {
        return $this->loanRepository->getByUser($userId);
    }

    public function recordPayment($loanId, $amountPaid)
    {
        $loan = $this->loanRepository->findById($loanId);

        // Record the payment
        $this->loanPaymentRepository->create([
            'loan_id' => $loan->id,
            'customer_name' => $loan->customer_name,
            'amount_paid' => $amountPaid
        ]);

        // Update the total paid amount
        $totalPaid = $loan->total_paid + $amountPaid;

        // Check if loan is fully paid
        $status = $totalPaid >= $loan->total_amount_to_pay ? 'paid' : $loan->status;

        return $this->loanRepository->updateLoan($loan, [
            'total_paid' => $totalPaid,
            'status' => $status
        ]);
    }
}
