<?php


namespace App\Repositories;

use App\Models\LoanPayment;

class LoanPaymentRepository
{
    public function create(array $data)
    {
        return LoanPayment::create($data);
    }
}
