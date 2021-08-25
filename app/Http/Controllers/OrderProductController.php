<?php

namespace App\Http\Controllers;

use App\Models\OrderProduct;
use Illuminate\Http\Request;

class OrderProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $orderProduct  = OrderProduct::all();
        return response()->json([
            'message'=>'Request successful',
            'code' => 0,
            'data' => $orderProduct
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
            'order_id' => 'required|numeric',
            'product_id' => 'required|numeric',
            'size_id' => 'required|numeric',
            'quantity' => 'required|numeric'
        ]);

        $orderProduct = OrderProduct::create($request->all());
        return response()->json([
            'message'=>'Order successfully created',
            'code'  => 0,
            'id'=> $orderProduct->id
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\OrderProduct  $orderProduct
     * @return \Illuminate\Http\Response
     */
    public function show(OrderProduct $orderProduct)
    {
        //
        
        return response()->json([
            'message'=>'Request successful',
            'code' => 0,
            'data' => $orderProduct
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\OrderProduct  $orderProduct
     * @return \Illuminate\Http\Response
     */
    public function edit(OrderProduct $orderProduct)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\OrderProduct  $orderProduct
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, OrderProduct $orderProduct)
    {
        //
        $request->validate([
            'order_id' => 'required|numeric',
            'product_id' => 'required|numeric',
            'size_id' => 'required|numeric',
            'quantity' => 'required|numeric'
            ]);
        $orderProduct->update($request->all());

        return response()->json([
            'message' => 'Order successfully created',
            'code' => 0,
            'id' => $orderProduct->id
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\OrderProduct  $orderProduct
     * @return \Illuminate\Http\Response
     */
    public function destroy(OrderProduct $orderProduct)
    {
        //
        $orderProduct->delete();
        return response()->json([
            'message' => 'Order successfully deleted',
            'code' => 0
        ]);
    }
}
