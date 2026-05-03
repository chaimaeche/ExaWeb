<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Exam;
use App\Models\Question;
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
    public function addQuestion(Request $request)
    {
        $request->validate([
            'exam_id' => 'required|exists:exams,id',
            'texte_question' => 'required|string',
            'choix1' => 'required|string',
            'choix2' => 'required|string',
            'choix3' => 'required|string',
            'choix4' => 'required|string',
            'reponse_correcte' => 'required|integer|in:1,2,3,4',
        ]);

        $question = Question::create([
            'exam_id' => $request->exam_id,
            'texte_question' => $request->texte_question,
            'choix1' => $request->choix1,
            'choix2' => $request->choix2,
            'choix3' => $request->choix3,
            'choix4' => $request->choix4,
            'reponse_correcte' => $request->reponse_correcte,
        ]);

        return response()->json([
            'message' => 'Question ajoutée avec succès !',
            'question' => $question
        ], 201);
    }
    public function getExamByCode($code)
    {
        // 1. كنقلبو على الامتحان بهاد الكود
        $exam = Exam::where('code_examen', $code)->first();

        // 2. إيلا مالقيناهش، كنرجعو خطأ
        if (!$exam) {
            return response()->json(['message' => 'Examen introuvable ou code invalide'], 404);
        }

        // 3. إيلا لقيناه، كنجيبو ݣاع الأسئلة اللي مربوطين بيه
        $questions = Question::where('exam_id', $exam->id)->get();

        // 4. كنصيفطو الامتحان والأسئلة ديالو لـ الفرونت-اند
        return response()->json([
            'exam' => $exam,
            'questions' => $questions
        ], 200);
    }
}