<?php

namespace App\Http\Controllers;

use App\Models\SizeType;
use Illuminate\Http\Request;

class SizeTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $sizeType  = SizeType::all();
        return response()->json([
            'message'=>'Request successful',
            'code' => 0,
            'data' => $sizeType
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
            'type' => 'required|string',

        ]);

        $sizeType = SizeType::create($request->all());
        return response()->json([
            'message'=>'Size Type successfully created',
            'code'  => 0,
            'id'=> $sizeType->id
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SizeType  $sizeType
     * @return \Illuminate\Http\Response
     */
    public function show(SizeType $sizeType)
    {
        //
        return response()->json([
            'message'=>'Request successful',
            'code' => 0,
            'data' => $sizeType
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SizeType  $sizeType
     * @return \Illuminate\Http\Response
     */
    public function edit(SizeType $sizeType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SizeType  $sizeType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SizeType $sizeType)
    {
        //
        $request->validate([
            'type' => 'required|string',

            ]);
        $sizeType->update($request->all());

        return response()->json([
            'message' => 'Size Type successfully created',
            'code' => 0,
            'id' => $sizeType->id
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SizeType  $sizeType
     * @return \Illuminate\Http\Response
     */
    public function destroy(SizeType $sizeType)
    {
        //

        if (!is_null($sizeType->size)) {
            foreach ($sizeType->size as $size) {
                if ($size->product) {
                    foreach ($size->product as $product) {
                        $product->delete();
                    }
                }

            };
        }

        $sizeType->delete();
        return response()->json([
            'message' => 'Size Type successfully deleted',
            'code' => 0
        ]);
    }
}
