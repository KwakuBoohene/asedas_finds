import { ProductService } from './../../services/http/product/product.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OrderService } from './../../services/http/order/order.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SessionStorageService } from 'ngx-webstorage';
import { StateService } from 'src/app/services/state/state.service';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/types/data-types';
import * as uuid from 'uuid';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items:Item[];
  references:string[];
  reference = uuid.v4();
  totalCost:number;
  paymentForm = new FormGroup({
    email : new FormControl('kwaku.kwayisi@gmail.com',[Validators.required,Validators.email] ),
    phone_no: new FormControl('0552520588',[Validators.required,Validators.minLength(10),Validators.maxLength(13)])
  })
  submitted:boolean;
  constructor(
    private loader: NgxUiLoaderService,
    private route: Router,
    private state:StateService,
    private session: SessionStorageService,
    private orderHTTP: OrderService,
    private productHTTP:ProductService
  ) { }

  ngOnInit(): void {
    this.state.cart$.subscribe(
      res => this.session.store('cart',res)
    );
    let items:Item[] = this.session.retrieve('cart')?this.session.retrieve('cart'):[];
    this.items= [];
    items.forEach(
      item =>{
        console.log(item.size);
         this.items.push(new Item(
           item.id,item.name,
           item.total_qty,item.qty,
           item.image,item.price,
           item.size
            ))}
    )
    this.orderHTTP.getReferences()
    .subscribe(
      res => this.references = res.references,
      err => console.log(err)
    )


    this.calculateTotal();
  }

  reduceQty(item:Item){
    item.reduceQuantity();
    this.calculateTotal();
  }

  increaseQty(item:Item){
    item.increaseQty();
    this.calculateTotal();
  }

  paymentDone(ref: any) {
    this.loader.start();
    console.log('Payment successful', ref);
    if(ref.status==='success'){
      this.createOrder(1)
    }else{
      this.createOrder(0)
    }
  }

  createOrder(isSuccessful:number){
      this.reference = uuid.v4();
    let order = {
      email : this.paymentForm.controls.email.value,
      phone_no: this.paymentForm.controls.phone_no.value,
      status: isSuccessful,
      amount: this.totalCost,
      reference: this.reference
    }
    this.orderHTTP.createOrder(order)
    .subscribe(
      res => {
        this.linkProductsToOrder(res.id)
      },
      err => console.log(err)

    )
  }
  paymentInit(){
    console.log('Payment initialized');

    }

  updateProductQuantity(quantity,id){
    this.productHTTP.updateProductQuantity(quantity,id)
    .subscribe(
      res=>{},
      err=>{console.log(err)}
    )
  }

  linkProductsToOrder(id){
    this.items.forEach(
      item => {
        this.orderHTTP.linkProductToOrder(item.id,id,item.size,item.qty).subscribe(
          res => {
            this.updateProductQuantity(item.qty,item.id)
          },
          err => {
            console.log(err) ;
            this.state.sendMessage('There was a problem with your order. Please try again ');
            this.state.toggleNotification(true);
            setTimeout(() => {
              this.state.toggleNotification(false);
            }, 1000);
          }
        )
      }
    )
    this.state.sendMessage('Order successfully made');
    this.state.toggleNotification(true);
    setTimeout(() => {
      this.state.toggleNotification(false);
    }, 1000);
   this.loader.start();
   setTimeout(() => {
    this.state.addToCart([]);
    this.route.navigate(['/']);
    this.loader.stop()
   }, 1000);

  }

  checkout(){
    if(this.paymentForm.valid){
      let checkoutbutton:HTMLElement = document.getElementById('checkout-button');
      checkoutbutton.click();
    }else{
      this.state.sendMessage('Please enter a valid email address and phone number');
      this.state.toggleNotification(true);
      setTimeout(() => {
        this.state.toggleNotification(false);
      }, 1000);
    }


  }

  paymentCancel() {
    console.log('payment failed');

  }

  calculateTotal(){
    this.totalCost = 0;
    this.items.forEach(
      item => {
        this.totalCost += item.cost
      }
    )
    this.totalCost = Math.ceil(this.totalCost);
  }

  deleteFromCart(id){
    let index = this.items.map((item)=>{item.id}).indexOf(id);
    this.items.splice(index,1);
    this.state.addToCart(this.items);
    this.state.sendMessage('Item Successfully deleted From  cart');
    this.state.toggleNotification(true);
    setTimeout(() => {
      this.state.toggleNotification(false);
    }, 1500);
  }

}
