<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Exam;
use Illuminate\Support\Str;

class ExamController extends Controller
{
    public function createExam(Request $request)
    {
        $request->validate([
            'titre' => 'required|string|max:255',
            'professeur_id' => 'required|integer|exists:users,id'
        ]);

        $code = strtoupper(Str::random(6));

        $exam = Exam::create([
            'titre' => $request->titre,
            'code_examen' => $code,
            'professeur_id' => $request->professeur_id,
        ]);

        return response()->json([
            'message' => 'Exam created successfully!',
            'exam' => $exam
        ], 201);
    }
}