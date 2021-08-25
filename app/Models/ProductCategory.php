<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    use HasFactory;
    protected $table = "product_categories";

    protected $fillable = [
        'category_id',
        'product_id',
    ];


    public function product(){
        return $this->belongsTo(Product::class);
    }

    public function categories(){
        return $this->belongsTo(Category::class);
    }
}
