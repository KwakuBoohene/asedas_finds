<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;


    use HasFactory;
    protected $table = "tags";

    protected $fillable = [
        'name',

    ];


    public function product_tag(){
        return $this->hasMany(ProductTag::class);
    }
}
