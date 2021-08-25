<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $productCategory  = ProductCategory::all();
        return response()->json([
            'message'=>'Request successful',
            'code' => 0,
            'data' => $productCategory
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
            'category_id' => 'required|integer|numeric',
            'product_id'=> 'required|integer|numeric'
        ]);

        $productCategory = ProductCategory::create($request->all());
        return response()->json([
            'message'=>'Product Category association successfully created',
            'code'  => 0
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProductCategory  $productCategory
     * @return \Illuminate\Http\Response
     */
    public function show(ProductCategory $productCategory)
    {
        //
        return response()->json([
            'message'=>'Request successful',
            'code' => 0,
            'data' => $productCategory
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ProductCategory  $productCategory
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductCategory $productCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProductCategory  $productCategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductCategory $productCategory)
    {
        //
        $request->validate([
            'category_id' => 'required|integer|numeric',
            'product_id'=> 'required|integer|numeric'
            ]);
        $productCategory->update($request->all());

        return response()->json([
            'message' => 'Product Category Association successfully updated',
            'code' => 0
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProductCategory  $productCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductCategory $productCategory)
    {
        //
        $productCategory->delete();
        return response()->json([
            'message' => 'Product Category successfully deleted',
            'code' => 0
        ]);
    }

    public function by_category(Category $category){
        $productCategory  = ProductCategory::where('category_id',$category->id)->with('product.images')->get();
        return response()->json([
            'message'=>'Request successful',
            'code' => 0,
            'data' => $productCategory
        ]);
    }

    public function delete_by_product(Product $product){
        $productCategories = ProductCategory::where('product_id',$product->id)->get();
        foreach($productCategories as $productCategory){
            $productCategory->delete();
        }
        $response= [
            'message'=> 'Product Categoriess all successfully deleted',
            'code' => 0
        ];

        return response($response,200);
    }
}
