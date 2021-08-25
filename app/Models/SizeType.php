<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SizeType extends Model
{
    use HasFactory;
    protected $table = "size_types";

    protected $fillable = [
       'type'
    ];


    public function size(){
        return $this->belongsTo(Size::class);
    }
}
