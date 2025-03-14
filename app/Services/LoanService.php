<?php

namespace App\Services;

use App\Repositories\LoanRepository;
use App\Repositories\LoanPaymentRepository;

use Carbon\Carbon;

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
        $data['amount_per_month'] = $totalAmountToPay / $data['repayment_plan'];
        $data['interest_rate'] = $interestRate * 100;
        $data['total_paid'] = 0;

        $loan = $this->loanRepository->create($data);

        $startDate = Carbon::parse($data['start_date']);

        for ($i = 1; $i <= $data['repayment_plan']; $i++) {
            $dueDate = $startDate->copy()->addMonths($i);

            $loanPaymentData = [
                'loan_id' => $loan->id,
                'customer_name' => $loan->customer_name,
                'due_date' => $dueDate,
                'status' => 'pending',
                'amount_paid' => 0,
                'balance' => $loan->total_amount_to_pay,
            ];

            $this->loanPaymentRepository->create($loanPaymentData);
        }

        return $loan;
    }

    public function getUserLoans($userId)
    {
        return $this->loanRepository->getByUser($userId);
    }

    public function recordPayment($loanId, $amountPaid, $paymentDate)
    {
        $loan = $this->loanRepository->findById($loanId);

        // Record the payment
        $this->loanPaymentRepository->createOrUpdate([
            'loan_id' => $loan->id,
            'customer_name' => $loan->customer_name,
            'amount_paid' => $amountPaid,
            'payment_date' => $paymentDate,
            'amount_per_month' => $loan->amount_per_month

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

    public function getCustomerNamesByUserId($userId)
    {
        return $this->loanRepository->getDistinctCustomerNamesByUser($userId);
    }

    public function getPaymentsByUser($userId)
    {

        return $this->loanPaymentRepository->getPaymentsByUser($userId);
    }


    public function getLoanHistory($loanId)
    {
        $loan = $this->loanRepository->findById($loanId);
        $payments = $this->loanPaymentRepository->getLoanHistory($loanId);

        return [
            'loan' => $loan,
            'payments' => $payments
        ];
    }

    public function getDashboardData($userId)
    {
        return [
            'total_loans' => $this->loanRepository->getTotalLoans($userId),
            'active_loans' => $this->loanRepository->getActiveLoans($userId),
            'recent_loans' => $this->loanRepository->getRecentLoans($userId),
            'total_loans_given' => $this->loanRepository->getTotalLoansGiven($userId),
            'total_amount_collected' => $this->loanPaymentRepository->getTotalAmountCollected($userId),
        ];
    }


}
