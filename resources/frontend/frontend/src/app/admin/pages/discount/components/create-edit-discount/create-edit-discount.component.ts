import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/http/product/product.service';
import { Discount, ImageSnippet, Product } from 'src/app/types/data-types';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HelperService } from 'src/app/services/helper/helper.service';
import { DiscountService } from 'src/app/services/http/discount/discount.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-create-edit-discount',
  templateUrl: './create-edit-discount.component.html',
  styleUrls: ['../../../product/components/create-edit-product/create-edit-product.component.scss'],
  animations : [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class CreateEditDiscountComponent implements OnInit {
  @Input() discount:Discount;
  products:Product[];
  @Output() messageEmitter = new EventEmitter<any>();
  errors:any[] =[];
  submitted:boolean;
  discountForm = new FormGroup({
    discount_percent: new FormControl('',[Validators.required]),
    active : new FormControl('',[Validators.required]),
    product: new FormControl('',[Validators.required] )
  });

  constructor(
    public state:StateService,
    private discountHTTP : DiscountService,
    private productHTTP : ProductService,
    private loader: NgxUiLoaderService,
    private helper: HelperService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnChanges(): void {
    if(this.discount){
      this.discountForm.controls.discount_percent.setValue(this.discount.discount_percent);
      this.discountForm.controls.active.setValue(this.discount.active);
      this.discount.product?
      this.discountForm.controls.product.setValue(this.discount.product.id):null;
    }else{
      this.discountForm.reset();

    }
  }

  loadProducts(){
    this.productHTTP.getProducts()
    .subscribe(
      (res)=>this.products = res.data,
      (err)=> console.log(err)
    )
  }

  closeModal(message?:any):void{
    this.submitted = false;
    this.discountForm.reset();
    this.state.toggleModal(false);
    message?this.messageEmitter.emit(message):null;
  }

  create(){
    this.submitted = true;

     if(this.discountForm.valid)
     {
    this.loader.start();
      let formData = this.discountForm.value;
      let productID = this.discountForm.controls.product.value;
      delete formData.product;


       this.discountHTTP.createDiscount(formData)
       .subscribe(
         (res)=>{
           this.productHTTP.addDiscount(productID,res.id)
           .subscribe(
             (res)=>{
               this.closeModal();
             },
             (err)=>{
              this.showErrors(err.error.errors);
             }
           )
         },
         (err)=>{
          this.showErrors(err.error.errors);
         }
       )
       this.loader.stop();
     }
  }

  edit(){
    this.submitted = true;

     if(this.discountForm.valid)
     {
    this.loader.start();
    let formData = this.discountForm.value;
    let productID = this.discountForm.controls.product.value;
    delete formData.product;


    this.discountHTTP.updateDiscount(formData,this.discount.id)
   .subscribe(
     (res)=>{
      this.productHTTP.addDiscount(productID,res.id)
           .subscribe(
             (res)=>{
               this.closeModal();
             },
             (err)=>{
              this.showErrors(err.error.errors);
             }
           )
       this.closeModal(res.message);
     },
     (err)=>{
        this.showErrors(err.error.errors);
     }
   )
       this.loader.stop();
     }

  }

  httpRequest(method:Observable<any>){
    method.subscribe(
      (res)=>{
        this.closeModal(res.message);
      },
      (err)=>{
         this.showErrors(err.error.errors);
      }
    )
        this.loader.stop();
  }



  showErrors(errorObject){
    this.errors = this.helper.getErrorsIntoArray(errorObject);
    setTimeout(() => {
      this.errors = undefined;
    }, 5000);

  }

}
