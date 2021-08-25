import { SizeService } from './../../../../services/http/size/size.service';
import { Component, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StateService } from 'src/app/services/state/state.service';
import { Size } from 'src/app/types/data-types';

@Component({
  selector: 'app-manage-sizes',
  templateUrl: './manage-sizes.component.html',
  styleUrls: ['./manage-sizes.component.scss'],
  animations : [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class ManageSizesComponent implements OnInit {

  sizes: any[];
  selectedSize:Size;
  deleteSize:Size;
  message;


  constructor(
    private state: StateService,
    private sizeHTTP : SizeService,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.loadSizes();
    this.state.modal$.
    subscribe(
      (res) => {
        if(!res){
          this.selectedSize = undefined;
          this.loadSizes();
        }
      }
    )
    this.state.modal2$.
    subscribe(
      (res) => {
        if(!res){
          this.deleteSize = undefined;
          this.loadSizes();
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

  loadSizes():void {
    this.loader.start();
    this.sizeHTTP.getSizes()
    .subscribe(
      (res) =>
      {
        this.sizes = res.data;
        this.loader.stop();
      },
      (err)=>{
        this.loader.stop();
      }
    );

  }

  edit(size:Size):void{
    this.selectedSize = size;
    this.openAddModal();
  }

  delete(size:Size){
    this.deleteSize = size;
    this.openDeleteModal();
  }

  receiveMessage($event){
    this.message = $event;
    setTimeout(() => {
      this.message = undefined;
    }, 4000);

  }

}
