<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LoanController;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/token', function () {
    return csrf_token(); 
});


Route::post('api/register', [AuthController::class, 'register']);
Route::post('api/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('api/loans', [LoanController::class, 'store']);
    Route::get('api/loans', [LoanController::class, 'index']);
    Route::post('api/loan-payment/{loanId}', [LoanController::class,'makePayment']);
});

