<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use Illuminate\Http\Request;

class DiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $discount  = Discount::with('product')->get();
        return response()->json([
            'message'=>'Request successful',
            'code' => 0,
            'data' => $discount
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
            'discount_percent' => 'required|numeric',
            'active' => 'required|boolean'
        ]);

        $discount = Discount::create($request->all());
        return response()->json([
            'message'=>'Discount successfully created',
            'code'  => 0,
            'id'=> $discount->id
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Discount  $discount
     * @return \Illuminate\Http\Response
     */
    public function show(Discount $discount)
    {
        //
        return response()->json([
            'message'=>'Request successful',
            'code' => 0,
            'data' => $discount
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Discount  $discount
     * @return \Illuminate\Http\Response
     */
    public function edit(Discount $discount)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Discount  $discount
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Discount $discount)
    {
        //
        $request->validate([
            'discount_percent' => 'required|numeric',
            'active' => 'required|boolean'
            ]);
        $discount->update($request->all());

        return response()->json([
            'message' => 'Discount successfully updated',
            'code' => 0,
            'id' => $discount->id
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Discount  $discount
     * @return \Illuminate\Http\Response
     */
    public function destroy(Discount $discount)
    {
        //

        $discount->delete();
        return response()->json([
            'message' => 'Discount successfully deleted',
            'code' => 0
        ]);
    }
}
