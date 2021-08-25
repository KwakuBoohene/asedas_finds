import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
import { HelperService } from 'src/app/services/helper/helper.service';
import { SizeTypeService } from 'src/app/services/http/size-type/size-type.service';
import { StateService } from 'src/app/services/state/state.service';
import { SizeType } from 'src/app/types/data-types';

@Component({
  selector: 'app-add-edit-size-type',
  templateUrl: './add-edit-size-type.component.html',
  styleUrls: ['../../../product/components/create-edit-product/create-edit-product.component.scss'],
  animations : [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class AddEditSizeTypeComponent implements OnInit {

  @Input() sizeType:SizeType;

  @Output() messageEmitter = new EventEmitter<any>();
  errors:any[] =[];
  submitted:boolean;
  sizeTypeForm = new FormGroup({
    type: new FormControl('',[Validators.required]),
  });

  constructor(
    public state:StateService,
    private sizeTypeHTTP : SizeTypeService,
    private loader: NgxUiLoaderService,
    private helper: HelperService
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if(this.sizeType){
      this.sizeTypeForm.controls.type.setValue(this.sizeType.type);
    }else{
      this.sizeTypeForm.reset();

    }
  }



  closeModal(message?:any):void{
    this.submitted = false;
    this.sizeTypeForm.reset();
    this.state.toggleModal(false);
    message?this.messageEmitter.emit(message):null;
  }

  create(){
    this.submitted = true;

     if(this.sizeTypeForm.valid)
     {
    this.loader.start();
      let formData = this.sizeTypeForm.value;
       this.sizeTypeHTTP.createSizeType(formData)
       .subscribe(
         (res)=>{
          this.closeModal(res.message);
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

     if(this.sizeTypeForm.valid)
     {
    this.loader.start();
    let formData = this.sizeTypeForm.value;
    this.sizeTypeHTTP.updateSizeType(formData,this.sizeType.id)
   .subscribe(
     (res)=>{
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
