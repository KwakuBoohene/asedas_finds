<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $product  = Product::with('discount')->with('images')->get();
        $response = [
            'message'=>'Request successful',
            'code' => 0,
            'data' => $product
        ];
        return response($response,200);
    }

    public function active(){
        $product  = Product::where('active',1)->where('qty_left','>',0)->with('discount')->with('images')->get();
        $response = [
            'message'=>'Request successful',
            'code' => 0,
            'data' => $product
        ];
        return response($response,200);
    }



    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name'=>'required|string',
            'desc'=>'required|string',
            'price'=>'required|numeric',
            'discount_id'=>'nullable|integer|numeric',
            'qty_left'=>'required|integer|numeric',
            'active'=>'required|boolean'
        ]);

        $product = Product::create(
            $request->all()
        );

        $response = [
            'message' => 'Product Successfully created',
            'code' => 0,
            'id' => $product->id
        ];

        return response($response,201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //

        $response = [
            'message'=>'Request successful',
            'code' => 0,
            'data' => [
                'product' => $product,
                'categories' => $product->category,
                'discount' => $product->discount,
                'images' =>$product->images,
                'sizes' => $product->size
            ]
        ];

        return response($response,200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
        $request->validate([
            'name'=>'required|string',
            'desc'=>'required|string',
            'price'=>'required|numeric',
            'discount_id'=>'nullable|integer|numeric',
            'qty_left'=>'required|integer|numeric',
            'active'=>'required|boolean'
            ]);
            if (!is_null($product->category)) {
                foreach ($product->category as $category) {
                    $category->delete();
                 }
            }
            if (!is_null($product->size)) {
                foreach ($product->size as $size) {
                    $size->delete();
                 }
            }


            $product->update($request->all());
            $response = [
                'message' => 'Product successfully updated',
                'code' => 0,
                'product' => $product->name
            ];
        return response($response,200);
    }

    public function add_discount(Request $request,Product $product){
        $request->validate([
            'discount_id'=>'required|integer|numeric'
        ]);
        $product->discount_id = $request->discount_id;

        $product->save();
        $response = [
            'message'=> 'Product successfully linked to discount',
            'code' => 0
        ];

        return response($response,200);
    }

    public function remove_discount(Request $request,Product $product){
        $request->validate([
            'discount_id'=>'required|integer|numeric',
        ]);
        $product->discount_id = null;
        $product->save();
        $response = [
            'message'=> 'Product successfully unlinked from discount',
            'code' => 0
        ];
        return response($response,200);
    }

    public function update_quantity(Request $request, Product $product){
        $request->validate([
            'quantity'=>'required|integer|numeric'
        ]);
        if(intval($request->quantity)<=$product->qty_left){
            $product->qty_left = $product->qty_left - intval($request->quantity);
            $product->save();
            $response = [
                'message'=> 'Product quantity successfully updated',
                'code' => 0
            ];
            return response($response,200);
        }else{
            $response = [
                'message'=> 'invalid quantity',
                'code' => 404
            ];
            return response($response,400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
        if (!is_null($product->images)) {
            foreach ($product->images as $image) {
                delete_image($image->image);
                $image->delete();
            };
        }

        if(!is_null($product->category)){
            foreach($product->category as $category){
                $category->delete();
            };
        }

        if(!is_null($product->size)){
            foreach($product->size as $size){
                $size->delete();
            };
        }

        $product->delete();
        $response = [
            'message' => 'Product successfully deleted',
            'code' => 0
        ];
        return response($response,200);
    }




}
