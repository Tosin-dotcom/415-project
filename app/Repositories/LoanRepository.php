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
}
