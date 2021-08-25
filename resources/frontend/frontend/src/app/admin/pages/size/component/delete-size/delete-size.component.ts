import { Size } from './../../../../../types/data-types';
import { Component, Input, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SizeService } from 'src/app/services/http/size/size.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-delete-size',
  templateUrl: './delete-size.component.html',
  styleUrls: ['./delete-size.component.scss']
})
export class DeleteSizeComponent implements OnInit {

  @Input() size:Size;
  submitted:boolean;

  constructor(
    private sizeHTTP : SizeService,
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
    this.deleteSizeRequest();

    this.loader.stop();
  }

  deleteSizeRequest(){
    this.sizeHTTP.deleteSize(this.size.id)
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
