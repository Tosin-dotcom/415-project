<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoanPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'loan_id',
        'customer_name',
        'amount_paid'
    ];

    public function loan()
    {
        return $this->belongsTo(Loan::class);
    }
}
