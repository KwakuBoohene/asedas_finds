<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Mail;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $order  = Order::all();
        return response()->json([
            'message'=>'Request successful',
            'code' => 0,
            'data' => $order
            ]);
    }

    public function reference(){
        $order = Order::all('reference');
        $response = [
            'message' => 'Request Successful',
            'code' => 0,
            'references' => $order
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
            'email' => 'required|email',
            'phone_no' => 'required',
            'status' => 'required',
            'amount' => 'required|numeric',
            'reference' => 'required|string'
        ]);

        $order = Order::create($request->all());
        $data  =[
            'number' => $order->id,
            'email' => $order->email,
            'phone_no' => $order->phone_no,
            'amount' => $order->amount,
            'status' => $order->status,
            'reference' => $order->reference,
            'created_at' => $order->created_at
        ];
        Mail::send('mail', $data, function($message) {
            $message->to('kwaku.kwayisi@gmail.com', 'Kwaku Boohene')->subject
               ("New Order");
            $message->from('asedasfinds2@gmail.com','Asedas Finds Admin Portal');
         });
        return response()->json([
            'message'=>'Order successfully created',
            'code'  => 0,
            'id'=> $order->id
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        //
        $order = Order::where('id',$order->id)->with(['product.product','product.size'])->first();
        return response()->json([
            'message'=>'Request successful',
            'code' => 0,
            'data' => $order
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
        $request->validate([
            'email' => 'required|email',
            'ip_address' => 'required|ip',
            'status' => 'required',
            'amount' => 'required|numeric',
            ]);
        $order->update($request->all());

        return response()->json([
            'message' => 'Order successfully created',
            'code' => 0,
            'order' => $order->name
        ]);
    }

    public function update_status(Request $request,Order $order){
        $request->validate([
            'status'=> 'required|boolean'
        ]);
        $order->status = $request->status;
        $order->save();
        $response = [
            'message' => 'Order status successfully updated',
            'code' => 0,
        ];
        return response($response,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
        if(!is_null($order->product)){
            foreach($order->product as $product){
                $product->delete();
            };
        }
        $order->delete();
        return response()->json([
            'message' => 'Order successfully deleted',
            'code' => 0
        ]);
    }


}
