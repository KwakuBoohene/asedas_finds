<?php

namespace App\Http\Controllers;

use App\Models\ProductImage;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductImageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
            'product_id'=>'nullable|integer|numeric',
            'image'=>'image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        ]);

                // Upload Image
            $name = $request->file('image')->getClientOriginalName();
            $path = $request->file('image')->store('public/images');
            $request->image = $name;
            // Upload Image


        $productImage = ProductImage::create(
            $request->except('image')
            +['image'=>str_replace('public/images/','',$path) ]
        );

            $response = [
                'message' => 'Product Image Successfully created',
                'code' => 0,
                'id' => $productImage->id
            ];

                return response($response,201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProductImage  $productImage
     * @return \Illuminate\Http\Response
     */
    public function show(ProductImage $productImage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ProductImage  $productImage
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductImage $productImage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProductImage  $productImage
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductImage $productImage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProductImage  $productImage
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductImage $productImage)
    {
        //
        delete_image($productImage->image);
        $productImage->delete();
        $response= [
            'message'=> 'Product Image successfully deleted',
            'code' => 0
        ];

        return response($response,200);
    }

    public function delete_by_product(Product $product){
        $productImages = ProductImage::where('product_id',$product->id)->get();
        foreach($productImages as $productImage){
            delete_image($productImage->image);
            $productImage->delete();
        }
        $response= [
            'message'=> 'Product Images all successfully deleted',
            'code' => 0
        ];

        return response($response,200);
    }
}
