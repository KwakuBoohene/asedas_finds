<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $category  = Category::all();
        return response()->json([
            'message'=>'Request successful',
            'code' => 0,
            'data' => $category
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
        'name' => 'required|string',
        'desc' => 'required|string',
        'image'=>'required|image|mimes:jpg,png,jpeg,gif,svg|max:4096',
        ]);

        // Upload Image
        $name = $request->file('image')->getClientOriginalName();
        $path = $request->file('image')->store('public/images');
        $request->image = $name;
        // Upload Image

        $category = Category::create(
            $request->except('image')
            +['image'=>str_replace('public/images/','',$path) ]
        );
        return response()->json([
            'message'=>'Category successfully created',
            'code'  => 0,
            'id'=> $category->id
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        //
        return response()->json([
            'message'=>'Request successful',
            'code' => 0,
            'data' => $category
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        //
        // $request->validate([
        //     'name' => 'required|string',
        //     'desc' => 'required|string',
        //     'image'=>'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        //     ]);
        try {
            //code...
            if($request->image){
                delete_image($category->image);
                // Upload Image
                $name = $request->file('image')->getClientOriginalName();
                $path = $request->file('image')->store('public/images');
                $request->image = $name;
                // Upload Image
                $category->update(
                    $request->except('image')
                    +['image'=>str_replace('public/images/','',$path) ]
                );
            }else{
                $category->update($request->all());
            }




            return response()->json([
                'message' => 'Category successfully updated',
                'code' => 0,
                'category' => $category->id
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'message' => $th,
            ]);
        }


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        //
        $category->delete();
        return response()->json([
            'message' => 'Category successfully deleted',
            'code' => 0
        ]);
    }

    private function delete_image($image){
        if(Storage::exists('public/images/'.$image)){
            Storage::delete('public/images/'.$image);
          }else{
            return('image does not exist');
          }

    }
}
