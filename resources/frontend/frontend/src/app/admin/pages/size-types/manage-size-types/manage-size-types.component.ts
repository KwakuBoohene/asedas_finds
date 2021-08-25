import { Component, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SizeTypeService } from 'src/app/services/http/size-type/size-type.service';
import { StateService } from 'src/app/services/state/state.service';
import { SizeType } from 'src/app/types/data-types';

@Component({
  selector: 'app-manage-size-types',
  templateUrl: './manage-size-types.component.html',
  styleUrls: ['./manage-size-types.component.scss'],
  animations : [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class ManageSizeTypesComponent implements OnInit {

  sizeTypes: any[];
  selectedSizeType:SizeType;
  deleteSizeType:SizeType;
  message;


  constructor(
    private state: StateService,
    private sizeTypeHTTP : SizeTypeService,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.loadSizeTypes();
    this.state.modal$.
    subscribe(
      (res) => {
        if(!res){
          this.selectedSizeType = undefined;
          this.loadSizeTypes();
        }
      }
    )
    this.state.modal2$.
    subscribe(
      (res) => {
        if(!res){
          this.deleteSizeType = undefined;
          this.loadSizeTypes();
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

  loadSizeTypes():void {
    this.loader.start();
    this.sizeTypeHTTP.getSizeTypes()
    .subscribe(
      (res) =>
      {
        this.sizeTypes = res.data;
        this.loader.stop();
      },
      (err)=>{
        this.loader.stop();
      }
    );

  }

  edit(sizeType:SizeType):void{
    this.selectedSizeType = sizeType;
    this.openAddModal();
  }

  delete(sizeType:SizeType){
    this.deleteSizeType = sizeType;
    this.openDeleteModal();
  }

  receiveMessage($event){
    this.message = $event;
    setTimeout(() => {
      this.message = undefined;
    }, 4000);

  }

}
