<?php

namespace App\Repositories;

use App\Models\Loan;

class LoanRepository
{
    public function create(array $data)
    {
        return Loan::create($data);
    }

    public function getByUser($userId)
    {
        return Loan::where('user_id', $userId)->get();
    }

    public function getById($id)
    {
        return Loan::findOrFail($id);
    }

    public function findById(int $loanId)
    {
        return Loan::where('id', $loanId)->firstOrFail();
    }

    public function updateLoan(Loan $loan, array $data)
    {
        $loan->update($data);
        return $loan;
    }

    public function getDistinctCustomerNamesByUser($userId)
    {
        return Loan::where('user_id', $userId)
                    ->distinct()
                    ->pluck('customer_name');
    }

    public function getTotalLoans($userId)
    {
        return Loan::where('user_id', $userId)->count();
    }

    public function getActiveLoans($userId)
    {
        return Loan::where('user_id', $userId)
                    ->where('status', 'ongoing')
                    ->count();
    }

    public function getRecentLoans($userId)
    {
        return Loan::where('user_id', $userId)
                    ->orderBy('updated_at', 'desc') 
                    ->take(2)
                    ->get();
    }

    public function getTotalLoansGiven($userId)
    {
        return Loan::where('user_id', $userId)->sum('amount');
    }

}
