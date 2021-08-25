<?php

namespace App\Http\Controllers;

use App\Models\Size;
use Illuminate\Http\Request;

class SizeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $size  = Size::with('type')->get()->sortBy('type_id');
        $response = [
            'message'=>'Request successful',
            'code' => 0,
            'data' => $size
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
            'type_id'=>'required|integer|numeric'
        ]);

        $size = Size::create(
            $request->all()
        );

        $response = [
            'message' => 'Size Successfully created',
            'code' => 0,
            'id' => $size->id
        ];

        return response($response,201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Size  $size
     * @return \Illuminate\Http\Response
     */
    public function show(Size $size)
    {
        //
        $response = [
            'message'=>'Request successful',
            'code' => 0,
            'data' => $size
        ];

        return response($response,200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Size  $size
     * @return \Illuminate\Http\Response
     */
    public function edit(Size $size)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Size  $size
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Size $size)
    {
        //
        $request->validate([
            'name'=>'required|string',
            'type_id'=>'required|integer|numeric',
            ]);

        $size->update($request->all());
        $response = [
            'message' => 'Size successfully updated',
            'code' => 0,
            'product' => $size->name
        ];
    return response($response,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Size  $size
     * @return \Illuminate\Http\Response
     */
    public function destroy(Size $size)
    {
        //
        if(!is_null($size->product)){
            foreach($size->product as $product){
                $product->delete();
            };
        }
        $size->delete();
        $response = [
            'message' => 'Size successfully deleted',
            'code' => 0
        ];
        return response($response,200);
    }
}
