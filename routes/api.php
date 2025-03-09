<?php

use App\Http\Controllers\LoanController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/loans', [LoanController::class, 'store']);
    Route::get('/loans', [LoanController::class, 'index']);
});
