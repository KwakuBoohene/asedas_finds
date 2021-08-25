import { SizeType } from './../../../../../types/data-types';
import { Component, Input, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SizeTypeService } from 'src/app/services/http/size-type/size-type.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-delete-size-type',
  templateUrl: './delete-size-type.component.html',
  styleUrls: ['./delete-size-type.component.scss']
})
export class DeleteSizeTypeComponent implements OnInit {

  @Input() sizeType:SizeType;
  submitted:boolean;

  constructor(
    private sizeTypeHTTP : SizeTypeService,
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
    this.deleteSizeTypeRequest();

    this.loader.stop();
  }

  deleteSizeTypeRequest(){
    this.sizeTypeHTTP.deleteSizeType(this.sizeType.id)
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
