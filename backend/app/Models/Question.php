<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_id',
        'texte_question',
        'choix1',
        'choix2',
        'choix3',
        'choix4',
        'reponse_correcte',
    ];
}
