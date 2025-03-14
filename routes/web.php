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


Route::get('/data', function () {
    return response()->json([
        'message' => 'Hello from Laravel!',
        'status' => 'success',
        'timestamp' => now()->toDateTimeString()
    ]);
});



Route::post('api/register', [AuthController::class, 'register'])->withoutMiddleware(['web', 'csrf']);;;
Route::post('api/login', [AuthController::class, 'login'])->withoutMiddleware(['web', 'csrf']);;

Route::post('api/loans', [LoanController::class, 'store'])->withoutMiddleware(['web', 'csrf']);;
Route::get('api/loans/{userId}', [LoanController::class, 'index'])->withoutMiddleware(['web', 'csrf']);;
Route::get('api/loans/customers/{userId}', [LoanController::class, 'getDistinctCustomerNames'])->withoutMiddleware(['web', 'csrf']);;
Route::post('api/loans/payment/{loanId}', [LoanController::class, 'makePayment'])->withoutMiddleware(['web', 'csrf']);;
Route::get('api/loans/payment/{userId}', [LoanController::class, 'getPaymentsByUser'])->withoutMiddleware(['web', 'csrf']);;
Route::get('api/loans/history/{loanId}', [LoanController::class, 'getLoanHistory'])->withoutMiddleware(['web', 'csrf']);;

Route::get('api/dashboard/{userId}', [LoanController::class, 'getDashboardData'])->withoutMiddleware(['web', 'csrf']);;


Route::middleware(['auth:sanctum'])->group(function () {
    //Route::post('api/loans', [LoanController::class, 'store']);
    //Route::get('api/loans', [LoanController::class, 'index']);
    //Route::post('api/loan-payment/{loanId}', [LoanController::class, 'makePayment']);
});


