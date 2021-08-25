import { Discount } from './../../../../../types/data-types';
import { ProductService } from 'src/app/services/http/product/product.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DiscountService } from 'src/app/services/http/discount/discount.service';
import { StateService } from 'src/app/services/state/state.service';


@Component({
  selector: 'app-delete-discount',
  templateUrl: './delete-discount.component.html',
  styleUrls: ['./delete-discount.component.scss']
})
export class DeleteDiscountComponent implements OnInit {

  @Input() discount:Discount;
  submitted:boolean;

  constructor(
    private discountHTTP : DiscountService,
    private productHTTP : ProductService,
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
    if(this.discount.product){
        this.productHTTP.
        removeDiscount(this.discount.product.id,this.discount.id)
        .subscribe((res)=>{
         this.deleteDiscountRequest();
        })
    }else{
      this.deleteDiscountRequest();
    }
    console.log(this.discount.product);

    this.loader.stop();
  }

  deleteDiscountRequest(){
    this.discountHTTP.deleteDiscount(this.discount.id)
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
