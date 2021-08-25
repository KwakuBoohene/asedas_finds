<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $payment  = Payment::all();
        return response()->json([
            'message'=>'Request successful',
            'code' => 0,
            'data' => $payment
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
            'email' => 'required|email',
            'status' => 'required|boolean',
            'amount' => 'required|numeric|integer',
            'order_id'=> 'required|integer'
        ]);

        $payment = Payment::create($request->all());
        return response()->json([
            'message'=>'Order successfully created',
            'code'  => 0,
            'payment'=> $payment->id
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function show(Payment $payment)
    {
        //
        return response()->json([
            'message'=>'Request successful',
            'code' => 0,
            'data' => $payment
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function edit(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Payment $payment)
    {
        //
        $request->validate([
            'email' => 'required|email',
            'method' => 'required',
            'status' => 'required|boolean',
            'amount' => 'required|numeric|integer',
            'order_id'=> 'required|integer'
            ]);
        $payment->update($request->all());

        return response()->json([
            'message' => 'Order successfully created',
            'code' => 0,
            'payment' => $payment->name
        ]);
    }

    public function update_status(Request $request,Payment $payment){
        $request->validate([
            'status'=> 'required|boolean'
        ]);
        $payment->status = $request->status;
        $payment->save();
        $response = [
            'message' => 'Payment status successfully updated',
            'code' => 0,
        ];
        return response($response,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Payment $payment)
    {
        //
        $payment->delete();
        return response()->json([
            'message' => 'Order successfully deleted',
            'code' => 0
        ]);
    }
}
