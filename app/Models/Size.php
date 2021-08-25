<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    use HasFactory;
    protected $table = "sizes";

    protected $fillable = [
        'name',
        'type_id'
    ];


    public function type(){
        return $this->belongsTo(SizeType::class);
    }

    public function product(){
        return $this->hasMany(ProductSize::class);
    }
}
