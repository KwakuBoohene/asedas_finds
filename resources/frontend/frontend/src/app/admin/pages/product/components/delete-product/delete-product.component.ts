import { DiscountService } from './../../../../../services/http/discount/discount.service';
import { Product } from './../../../../../types/data-types';
import { Component, Input, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/services/http/product/product.service';
import { StateService } from 'src/app/services/state/state.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {
  @Input() product:Product;
  submitted:boolean;

  constructor(
    private productHTTP : ProductService,
    private discountHTTP : DiscountService,
    private loader: NgxUiLoaderService,
    private state:StateService
  ) { }

  ngOnInit(): void {

  }

  closeModal():void{
    this.submitted = false;
    this.state.toggleModal2(false);
  }

  delete():void{
    this.submitted = true;
    this.loader.start();
    this.deleteProductRequest();
  }


  deleteProductRequest(){
    this.productHTTP.deleteProduct(this.product.id)
    .subscribe(
      (res)=>{
        this.product.discount_id?this.deleteDiscountRequest():this.closeModal();
      },
      (err)=>{
        console.log(err);
      }
    );

  }

  deleteDiscountRequest(){
    this.discountHTTP.deleteDiscount(this.product.discount_id)
    .subscribe(
      (res)=>{
        this.closeModal();
      },
      (err)=>{
        console.log(err);
      }
    );
  }

}
