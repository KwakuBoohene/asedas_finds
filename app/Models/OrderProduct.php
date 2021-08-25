<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderProduct extends Model
{
    use HasFactory;
    protected $table = "order_products";

    protected $fillable = [
        'order_id',
        'product_id',
        'size_id',
        'quantity'
    ];


    public function product(){
        return $this->belongsTo(Product::class);
    }

    public function size(){
        return $this->belongsTo(Size::class);
    }

    public function order(){
        return $this->belongsTo(Order::class);
    }

}
