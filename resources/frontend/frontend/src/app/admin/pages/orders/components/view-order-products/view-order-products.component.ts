import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HelperService } from 'src/app/services/helper/helper.service';
import { OrderService } from 'src/app/services/http/order/order.service';
import { StateService } from 'src/app/services/state/state.service';
import { Order } from 'src/app/types/data-types';

@Component({
  selector: 'app-view-order-products',
  templateUrl: './view-order-products.component.html',
  styleUrls: ['./view-order-products.component.scss'],
  animations : [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class ViewOrderProductsComponent implements OnInit,OnChanges {
  @Input() order:Order;
  products:any[] = [];
  orderDetails;
  constructor(
    public state:StateService,
    private orderHTTP : OrderService,
    private loader: NgxUiLoaderService,
    private helper: HelperService
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if(this.order){
      this.loadOrder()
    }
  }

  loadOrder(){
    this.loader.start();
    this.orderHTTP.getSingleOrder(this.order.id)
    .subscribe(
      res =>{
        this.products = res.data.product;
        this.loader.stop();
      },
      err => console.log(err)
    )
  }

  closeModal():void{

    this.state.toggleModal(false);
  }

}
