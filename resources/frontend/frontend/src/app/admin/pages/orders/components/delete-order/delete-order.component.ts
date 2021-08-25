import { Component, Input, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OrderService } from 'src/app/services/http/order/order.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.scss']
})
export class DeleteOrderComponent implements OnInit {

  @Input() order_id:number;
  submitted:boolean;

  constructor(
    private orderHTTP : OrderService,
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
    this.orderHTTP.deleteOrder(this.order_id)
    .subscribe(
      (res)=>{
        this.closeModal();
      },
      (err)=>{
        console.log(err);
      }
    );
    this.loader.stop();
  }
}
