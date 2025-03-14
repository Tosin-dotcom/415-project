<?php


namespace App\Repositories;

use App\Models\LoanPayment;

use Carbon\Carbon;


class LoanPaymentRepository
{

    public function create(array $data)
    {
        $loan = LoanPayment::create($data);
    }


    public function createOrUpdate(array $data)
    {
        $paymentMonth = Carbon::parse($data['payment_date'])->format('m');

        $loanPayment = LoanPayment::whereMonth('due_date', $paymentMonth)
            ->where('loan_id', $data['loan_id'])
            ->first();
        $lastPayment = LoanPayment::where('loan_id', $data['loan_id'])
            ->whereNotNull('payment_date')
            ->latest('payment_date')
            ->first();

        if ($loanPayment) {
            $previousBalance = $lastPayment ? $lastPayment->balance : $loanPayment->balance;
            $newAmountPaid = $loanPayment->amount_paid + $data['amount_paid'];
            $newBalance = max(0, $previousBalance - $newAmountPaid);
            $status = $newAmountPaid >= $data['amount_per_month'] ? 'paid' : 'partial';
            $loanPayment->update([
                'amount_paid' => $newAmountPaid,
                'payment_date' => $data['payment_date'],
                'status' => $status,
                'balance' => $newBalance
            ]);

            return $loanPayment;
        }

        $lastPayment = LoanPayment::where('loan_id', $data['loan_id'])
            ->whereNotNull('payment_date')
            ->latest('payment_date')
            ->first();
        $previousBalance = $lastPayment ? $lastPayment->balance : $data['amount_per_month'];
        $newBalance = max(0, $previousBalance - $data['amount_paid']);
        return LoanPayment::create([
            'loan_id' => $data['loan_id'],
            'customer_name' => $data['customer_name'],
            'due_date' => $data['payment_date'],
            'amount_paid' => $data['amount_paid'],
            'payment_date' => $data['payment_date'],
            'status' => $data['amount_paid'] >= $data['amount_per_month'] ? 'paid' : 'partial',
            'balance' => $newBalance
        ]);
    }



    public function getPaymentsByUser($userId)
    {
        return LoanPayment::join('loans', 'loan_payments.loan_id', '=', 'loans.id')
            ->where('loans.user_id', $userId)
            ->whereNotNull('loan_payments.payment_date')
            ->select(
                'loan_payments.*',
                'loans.status'
            )
            ->orderBy('loan_payments.payment_date', 'desc')
            ->get();
    }

    public function getLoanHistory($loanId)
    {
        return LoanPayment::where('loan_id', $loanId)->get();
    }

    public function getTotalAmountCollected($userId)
{
    return LoanPayment::join('loans', 'loans.id', '=', 'loan_payments.loan_id')
        ->where('loans.user_id', $userId)
        ->sum('loan_payments.amount_paid');
}


    
}

