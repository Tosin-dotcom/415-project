<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'customer_name',
        'amount',
        'repayment_plan',
        'start_date',
        'interest_rate',
        'amount_per_month',
        'total_amount_to_pay', 
        'status',              
        'total_paid'           
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
