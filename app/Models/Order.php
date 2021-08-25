<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = "orders";

    protected $fillable = [
        'email',
        'phone_no',
        'status',
        'amount',
        'reference'
    ];


    public function product(){
        return $this->hasMany(OrderProduct::class);
    }

    public function payment(){
        return $this->hasMany(Payment::class);
    }
}
