import { Product } from './../../../../types/data-types';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from './../../../../services/http/product/product.service';
import { StateService } from '../../../../services/state/state.service';
import { Component, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
  animations : [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class ManageProductsComponent implements OnInit {
  products: any[];
  selectedProduct:any;
  deleteProduct:Product;
  message;


  constructor(
    private state: StateService,
    private productService : ProductService,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.state.modal$.
    subscribe(
      (res) => {
        if(!res){
          this.selectedProduct = undefined;
          this.loadProducts();
        }
      }
    )
    this.state.modal2$.
    subscribe(
      (res) => {
        if(!res){
          this.deleteProduct = undefined;
          this.loadProducts();
        }
      }
    )


  }

  openAddModal():void{
    this.state.toggleModal(true);
  }

  openDeleteModal():void{
    this.state.toggleModal2(true);
  }

  loadProducts():void {
    this.loader.start();
    this.productService.getProducts()
    .subscribe(
      (res) =>
      {
        this.products = res.data;
        console.log(this.products);
        this.loader.stop();
      },
      (err)=>{
        this.loader.stop();
      }
    );

  }

  edit(product:Product):void{
    this.selectedProduct = product;
    this.openAddModal();
  }

  delete(product:Product){
    this.deleteProduct = product;
    this.openDeleteModal();
  }

  receiveMessage($event){
    this.message = $event;
    setTimeout(() => {
      this.message = undefined;
    }, 1500);

  }

}
