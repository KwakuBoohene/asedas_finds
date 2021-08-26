<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;

class EmailController extends Controller
{
    //

    public function shopping_request(Request $request){
        $request->validate([
            'name' =>'required|string',
            'phone_no' =>'required|string',
            'instagram' =>'nullable|string',
            'facebook' =>'nullable|string',
            'items_no'=>'required|numeric',
            'size'=>'required|string',
            'items_needed'=>'required|string',
            'location'=>'required|string'
            ]);

        $data = [
            'name' =>$request->name,
            'phone_no' =>$request->phone_no,
            'instagram' =>$request->instagram,
            'facebook' =>$request->facebook,
            'items_no'=>$request->items_no,
            'items_needed'=>$request->items_needed,
            'size'=>$request->size,
            'location'=>$request->location
        ];

        Mail::send('shopping_request', $data, function($message) {
            $message->to('asedasfinds@gmail.com', 'Asedas Finds')->subject
                ("New Shopping Request");
            $message->from('asedasfinds2@gmail.com','Asedas Finds Admin Portal');
            });
        return response()->json([
            'message'=>'Shopping Request Sent',
            'code'  => 0,
        ]);
    }


    public function gift_voucher(Request $request){
        $request->validate([
            'name'=>'required|string',
            'phone_no'=>'required|string',
            'instagram'=>'nullable|string',
            'facebook'=>'nullable|string',
            'receipient'=>'required|string',
            'amount'=>'required|numeric',
            'receipient_number'=>'required|string',
            'receipient_instagram'=>'nullable|string',
            'receipient_whatsapp'=>'nullable|string',
            'location'=>'required|string',
            'date'=>'required|date',
            'messager'=>'required|string'
            ]);

        $data = [
            'name'=>$request->name,
            'phone_no'=>$request->phone_no,
            'instagram'=>$request->instagram,
            'facebook'=>$request->facebook,
            'receipient'=>$request->receipient,
            'amount'=>$request->amount,
            'receipient_number'=>$request->receipient_number,
            'receipient_instagram'=>$request->receipient_instagram,
            'receipient_whatsapp'=>$request->receipient_whatsapp,
            'location'=>$request->location,
            'date'=>$request->date,
            'messager'=>$request->messager
        ];

        Mail::send('gift_voucher', $data, function($message) {
            $message->to('asedasfinds@gmail.com', 'Asedas Finds')->subject
                ("Request for Gift Voucher");
            $message->from('asedasfinds2@gmail.com','Asedas Finds Admin Portal');
            });
        return response()->json([
            'message'=>'Request for Gift Voucher Sent',
            'code'  => 0,
        ]);
    }

    public function gift_box(Request $request){
        $request->validate([
            'name'=>'required|string',
            'phone_no'=>'required|string',
            'instagram'=>'nullable|string',
            'facebook'=>'nullable|string',
            'receipient'=>'required|string',
            'option'=>'required|string',
            'receipient_number'=>'required|string',
            'receipient_instagram'=>'nullable|string',
            'receipient_facebook'=>'nullable|string',
            'location'=>'required|string',
            'date'=>'required|date',
            'messager'=>'nullable|string'
            ]);

        $data = [
            'name'=>$request->name,
            'phone_no'=>$request->phone_no,
            'instagram'=>$request->instagram,
            'facebook'=>$request->facebook,
            'receipient'=>$request->receipient,
            'option'=>$request->option,
            'receipient_number'=>$request->receipient_number,
            'receipient_instagram'=>$request->receipient_instagram,
            'receipient_facebook'=>$request->receipient_facebook,
            'location'=>$request->location,
            'date'=>$request->date,
            'messager'=>$request->messager
        ];

        Mail::send('gift_box', $data, function($message) {
            $message->to('asedasfinds@gmail.com', 'Asedas Finds')->subject
                ("Request for Gift Box");
            $message->from('asedasfinds2@gmail.com','Asedas Finds Admin Portal');
            });
        return response()->json([
            'message'=>'Request for Gift Box Sent',
            'code'  => 0,
        ]);
    }

    public function resale(Request $request){
        $request->validate([
            'name' =>'required|string',
            'phone_no' =>'required|string',
            'instagram' =>'nullable|string',
            'items_no'=>'required|numeric',
            'state'=>'required|string',
            'location'=>'required|string',
            'email'=>'nullable|email'
            ]);

        $data = [
            'name' =>$request->name,
            'phone_no' =>$request->phone_no,
            'instagram' =>$request->instagram,
            'items_no'=>$request->items_no,
            'state'=>$request->state,
            'location'=>$request->location,
            'email'=>$request->email
        ];

        Mail::send('resale', $data, function($message) {
            $message->to('asedasfinds@gmail.com', 'Asedas Finds')->subject
                ("New Clothing Resale Request");
            $message->from('asedasfinds2@gmail.com','Asedas Finds Admin Portal');
            });
        return response()->json([
            'message'=>'Clothing Resale Request Sent',
            'code'  => 0,
        ]);
    }

    public function contact(Request $request){
        $request->validate([
            'fname' =>'required|string',
            'lname' =>'required|string',
            'phone_no' =>'required|string',
            'instagram' =>'nullable|string',
            'messager'=>'required|string',
            'email'=>'nullable|email'
            ]);

        $data = [
            'fname' =>$request->fname,
            'lname' =>$request->lname,
            'phone_no' =>$request->phone_no,
            'instagram' =>$request->instagram,
            'messager'=>$request->messager,
            'email'=>$request->email
        ];

        Mail::send('contact', $data, function($message) {
            $message->to('asedasfinds@gmail.com', 'Asedas Finds')->subject
                ("New Clothing Resale Request");
            $message->from('asedasfinds2@gmail.com','Asedas Finds Admin Portal');
            });
        return response()->json([
            'message'=>'Clothing Resale Request Sent',
            'code'  => 0,
        ]);
    }


}
