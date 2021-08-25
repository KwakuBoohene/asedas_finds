export interface AuthObject{
  email: string;
  password: string;
};

export interface User{
  id:number;
  fname:string;
  lname:string;
  email:string;
  email_verified_at?:string;
  created_at?:Date;
  updated_at?:Date;
}

export interface Product{
  id:number;
  name:string;
  desc:string;
  images:any[];
  price:number;
  discount_id?:number;
  qty_left:number;
  active:number;
  discount:any;
  created_at?:Date;
  updated_at?:Date;
}

export interface Category{
  id:number;
  name:string;
  desc:string;
  image:string;
  created_at?:Date;
  updated_at?:Date;
}

export interface Order{
  id:number;
  email:string;
  phone_no:string;
  status:number;
  reference:string;
  product?:any;
  amount:number;
  created_at?:Date;
  updated_at?:Date;
}

export interface Discount{
  id:number;
  discount_percent:number;
  active:any;
  product?:Product;
}

export interface Size{
  id:number;
  name:string;
  type_id:number;
}

export interface SizeType{
  id:number;
  type:string;
}

export class Item
{
  cost:number;
  constructor(
    public id:number,
    public name:string,
    public total_qty:number,
    public qty:number,
     public image:string,
    public price:number,
    public size:number) {
    this.calculateCost();
  }

  reduceQuantity(){
    this.qty>1?this.qty -=1:null;
    this.calculateCost()
  }

  increaseQty(){
    this.qty<this.total_qty?this.qty+=1:null;
    this.calculateCost();
  }

  calculateCost(){
    this.cost = this.price * this.qty;
  }
}




export class ImageSnippet
{
  constructor(public src: string, public file: File) {}
}
