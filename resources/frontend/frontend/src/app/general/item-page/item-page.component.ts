import { environment } from 'src/environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SizeService } from './../../services/http/size/size.service';
import { ProductService } from './../../services/http/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Item, Product } from './../../types/data-types';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { StateService } from 'src/app/services/state/state.service';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss']
})
export class ItemPageComponent implements OnInit {
  product:Product;
  id:number;
  images:any[];
  selectedImage:string;
  sizes:any[]=[];
  selectedSize:number;
  cart: Item[] = [];
  quantity = 1;
  discount:any;
  environment = environment;

  constructor(
    private route:ActivatedRoute,
    private productHTTP: ProductService,
    private sizeHTTP: SizeService,
    private loader: NgxUiLoaderService,
    private state: StateService,
    private session: SessionStorageService,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this.loader.start();
    this.route.queryParams.subscribe(
      params => {
        if(params.id){
          this.id = params.id;
          this.getSingleProduct(this.id)
        }else{
          this._location.back();
        }
       ;
      }
    )
    this.cart = this.session.retrieve('cart')?this.session.retrieve('cart'):[];
    this.state.cart$.subscribe(
      res => this.session.store('cart',res)
    );
  }

  getSingleProduct(id){
    this.productHTTP.getSingleProduct(id)
        .subscribe(
          res => {
            this.product = res.data.product;
            this.images = res.data.images;
            this.selectedImage = this.images[0].image;
            this.discount = res.data.discount;
            this.getAllSizes(res.data.sizes);
          }
        )
    this.loader.stop();
  }

  getAllSizes(array:any[]){
    array.forEach(
      size => {
        console.log(size);
        this.sizeHTTP.getSingleSize(size.size_id)
        .subscribe(
          res => this.sizes.push(res.data),
          err => console.log(err)
        )
      }
    )
  }

  reduceQty(){
    this.quantity>1?this.quantity -=1:null;
  }

  increaseQty(){
    this.quantity<this.product.qty_left?this.quantity+=1:null;
  }

  addToCart(product: Product){

    if(!this.selectedSize){
      this.state.sendMessage('Please select a size');
      this.state.toggleNotification(true);
      setTimeout(() => {
        this.state.toggleNotification(false);
      }, 2000);
      return;
    }
    if(this.cart.some(item => item.id===product.id)){
      this.state.sendMessage('Item has already been added to cart');
      this.state.toggleNotification(true);
      setTimeout(() => {
        this.state.toggleNotification(false);
      }, 2000);
    }else{
      console.log(this.selectedSize)
      let price = (product.discount && product.discount.active)?(product.price*(100-product.discount.discount_percent)*0.01):product.price;
      let item:Item = new Item(product.id,
        product.name,product.qty_left,
        this.quantity,product.images[0].image,price,this.selectedSize)
      this.cart.push(item);
      this.state.addToCart(this.cart);
      this.state.sendMessage('Item added Successfully to cart');
      this.state.toggleNotification(true);
      setTimeout(() => {
        this.state.toggleNotification(false);
      }, 2000);
    }

  }

  changeSelectedImage(image:string){
    this.selectedImage =image;
  }



}
