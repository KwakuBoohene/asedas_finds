<?php

namespace App\Http\Controllers;

use App\Models\ProductSize;
use Illuminate\Http\Request;

class ProductSizeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $productSize  = ProductSize::with('size')->get();
        return response()->json([
            'message'=>'Request successful',
            'code' => 0,
            'data' => $productSize
        ]);
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
            'size_id' => 'required|integer|numeric',
            'product_id'=> 'required|integer|numeric'
        ]);

        $productSize = ProductSize::create($request->all());
        return response()->json([
            'message'=>'Product Size successfully created',
            'code'  => 0,
            'id'=> $productSize->id
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProductSize  $productSize
     * @return \Illuminate\Http\Response
     */
    public function show(ProductSize $productSize)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ProductSize  $productSize
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductSize $productSize)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProductSize  $productSize
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductSize $productSize)
    {
        //
        $request->validate([
            'size_id' => 'required|integer|numeric',
            'product_id'=> 'required|integer|numeric'
            ]);
        $productSize->update($request->all());

        return response()->json([
            'message' => 'Product Size successfully created',
            'code' => 0,
            'id' => $productSize->id
        ]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProductSize  $productSize
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductSize $productSize)
    {
        //
        $productSize->delete();
        return response()->json([
            'message' => 'Product Size successfully deleted',
            'code' => 0
        ]);
    }
}
