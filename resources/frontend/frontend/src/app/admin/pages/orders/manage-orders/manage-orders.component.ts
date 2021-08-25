import { OrderService } from './../../../../services/http/order/order.service';
import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state/state.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Order } from 'src/app/types/data-types';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit {

  orders: any[];
  selectedOrder:any;
  deleteOrderId:number;

  constructor(
    private state: StateService,
    private orderHTTP : OrderService,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.loadOrders();
    this.state.modal$.
    subscribe(
      (res) => {
        if(!res){
          this.selectedOrder = undefined;
          this.loadOrders();
        }
      }
    )
    this.state.modal2$.
    subscribe(
      (res) => {
        if(!res){
          this.deleteOrderId = undefined;
          this.loadOrders();
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

  loadOrders():void {
    this.loader.start();
    this.orderHTTP.getOrders()
    .subscribe(
      (res) =>
      {
        this.orders = res.data;
        this.loader.stop();
      },
      (err)=>{
        this.loader.stop();
      }
    );

  }

  edit(order:Order):void{
    this.selectedOrder = order;
    this.openAddModal();
  }

  delete(id:number){
    this.deleteOrderId = id;

    this.openDeleteModal();
  }

}
