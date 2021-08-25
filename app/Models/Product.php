<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = "products";
    protected $fillable = [
        'name',
        'desc',
        'price',
        'discount_id',
        'qty_left',
        'active'
    ];


    public function category(){
        return $this->hasMany(ProductCategory::class);
    }

    public function order_product(){
        return $this->hasMany(OrderProduct::class);
    }

    public function images(){
        return $this->hasMany(ProductImage::class);
    }

    public function size(){
        return $this->hasMany(ProductSize::class);
    }

    public function product_tag(){
        return $this->hasMany(ProductTag::class);
    }


    public function discount(){
        return $this->belongsTo(Discount::class);
    }
}
