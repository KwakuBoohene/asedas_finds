<?php

namespace App\Http\Controllers;

use App\Models\ProductTag;
use Illuminate\Http\Request;

class ProductTagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $productTag  = ProductTag::all();
        return response()->json([
            'message'=>'Request successful',
            'code' => 0,
            'data' => $productTag
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
            'order_id' => 'required|integer|numeric',
            'product_id'=> 'required|integer|numeric'
        ]);

        $productTag = ProductTag::create($request->all());
        return response()->json([
            'message'=>'Product Tag successfully created',
            'code'  => 0,
            'id'=> $productTag->id
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProductTag  $productTag
     * @return \Illuminate\Http\Response
     */
    public function show(ProductTag $productTag)
    {
        //
        return response()->json([
            'message'=>'Request successful',
            'code' => 0,
            'data' => $productTag
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ProductTag  $productTag
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductTag $productTag)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProductTag  $productTag
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductTag $productTag)
    {
        //
        $request->validate([
            'order_id' => 'required|integer|numeric',
            'product_id'=> 'required|integer|numeric'
            ]);
        $productTag->update($request->all());

        return response()->json([
            'message' => 'Product Tag successfully created',
            'code' => 0,
            'id' => $productTag->id
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProductTag  $productTag
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductTag $productTag)
    {
        //
        $productTag->delete();
        return response()->json([
            'message' => 'Product Tag successfully deleted',
            'code' => 0
        ]);
    }
}
