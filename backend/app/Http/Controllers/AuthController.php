<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // 1. هنا كنتأكدو باللي المعلومات اللي دخل المستعمل صحيحة وكاملة
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'date_naissance' => 'required|date',
            'sexe' => 'required|in:homme,femme',
            'etablissement' => 'required|string|max:255',
            'filiere' => 'required|string|max:255',
            'role' => 'required|in:etudiant,enseignant',
            'password' => 'required|string|min:6',
        ]);

        // 2. هنا كنكرييو المستعمل فـ قاعدة البيانات وكنشفرو المودپاس
        $user = User::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'date_naissance' => $request->date_naissance,
            'sexe' => $request->sexe,
            'etablissement' => $request->etablissement,
            'filiere' => $request->filiere,
            'role' => $request->role,
            'password' => Hash::make($request->password),
        ]);

        // 3. كنرجعو رسالة ديال النجاح لـ Front-end
        return response()->json([
            'message' => 'Inscription réussie avec succès!',
            'user' => $user
        ], 201);
    }
}