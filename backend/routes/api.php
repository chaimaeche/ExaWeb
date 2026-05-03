<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExamController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/exams', [ExamController::class, 'createExam']);
Route::post('/questions', [ExamController::class, 'addQuestion']);
Route::get('/exams/{code}', [ExamController::class, 'getExamByCode']);