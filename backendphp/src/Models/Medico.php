<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Medico extends Model
{
    protected $table = 'medicos';

    protected $fillable = [
        'nome',
        'CRM',
        'UFCRM'
    ];

    public $timestamps = false;
}