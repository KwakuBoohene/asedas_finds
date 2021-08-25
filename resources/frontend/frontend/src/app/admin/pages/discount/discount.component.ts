import { DiscountService } from './../../../services/http/discount/discount.service';
import { Component, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StateService } from 'src/app/services/state/state.service';
import { Discount } from 'src/app/types/data-types';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss'],
  animations : [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class DiscountComponent implements OnInit {
  discounts: any[];
  selectedDiscount:any;
  deleteDiscount:Discount;
  message;


  constructor(
    private state: StateService,
    private discountService : DiscountService,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.loadDiscounts();
    this.state.modal$.
    subscribe(
      (res) => {
        if(!res){
          this.selectedDiscount = undefined;
          this.loadDiscounts();
        }
      }
    )
    this.state.modal2$.
    subscribe(
      (res) => {
        if(!res){
          this.deleteDiscount = undefined;
          this.loadDiscounts();
        }
      }
    )


  }

  openAddModal():void{
    this.state.toggleModal(true);
  }

  openDeleteModal():void{
    console.log('called')
    this.state.toggleModal2(true);
  }

  loadDiscounts():void {
    this.loader.start();
    this.discountService.getDiscounts()
    .subscribe(
      (res) =>
      {
        this.discounts = res.data;
        this.loader.stop();
      },
      (err)=>{
        this.loader.stop();
      }
    );

  }

  edit(discount:Discount):void{
    this.selectedDiscount = discount;
    this.openAddModal();
  }

  delete(discount:Discount){
    this.deleteDiscount = discount;
    this.openDeleteModal();
  }

  receiveMessage($event){
    this.message = $event;
    setTimeout(() => {
      this.message = undefined;
    }, 4000);

  }
}
