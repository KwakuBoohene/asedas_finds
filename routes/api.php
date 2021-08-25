<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderProductController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductSizeController;
use App\Http\Controllers\ProductTagController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\SizeController;
use App\Http\Controllers\SizeTypeController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmailController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/login',[AuthController::class,'login']);

// Route::group(['middleware'=>['auth:sanctum']],function(){
// });



Route::resource('discount', DiscountController::class);

Route::resource('order', OrderController::class);
Route::put('order/update-status',[OrderController::class,'update_status']);
Route::get('order-reference',[OrderController::class,'reference'])->name('reference');

Route::resource('order-product', OrderProductController::class);
Route::resource('payment', PaymentController::class);
Route::put('payment/update-status',[PaymentController::class,'update_status']);

Route::resource('size', SizeController::class);
Route::resource('size-type', SizeTypeController::class);
Route::resource('tag', TagController::class);

Route::resource('category', CategoryController::class);
Route::post('category/{category}',[CategoryController::class,'update']);

Route::resource('product-size', ProductSizeController::class);
Route::resource('product-tag', ProductTagController::class);
Route::resource('product-image', ProductImageController::class);
Route::delete('product-image/delete-multiple/{product}',[ProductImageController::class,'delete_by_product']);

Route::resource('product-category', ProductCategoryController::class);
Route::get(
    '/product-category/by-category/{category}',
    [ProductCategoryController::class, 'by_category']
)->name('by-category');
Route::post('product-category/delete-multiple',[ProductCategoryController::class,'delete_multiple']);

Route::resource('product', ProductController::class);
Route::get('product-active',[ProductController::class,'active']);
Route::post('product/{product}',[ProductController::class,'update']);
Route::put('product/update-quantity/{product}',[ProductController::class,'update_quantity']);

Route::put('product/add-discount/{product}',[ProductController::class,'add_discount']);
Route::put('product/remove-discount/{product}',[ProductController::class,'remove_discount']);

Route::post('/shopping-request',[EmailController::class,'shopping_request']);
Route::post('/gift-voucher',[EmailController::class,'gift_voucher'] );
Route::post('/gift-box',[EmailController::class,'gift_box']);
Route::post('/resale',[EmailController::class,'resale']);
Route::post('/contact-us',[EmailController::class,'contact']);
