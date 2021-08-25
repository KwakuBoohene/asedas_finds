import { SizeTypeService } from './../../../../../services/http/size-type/size-type.service';
import { Size, SizeType } from './../../../../../types/data-types';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
import { HelperService } from 'src/app/services/helper/helper.service';
import { SizeService } from 'src/app/services/http/size/size.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-add-edit-size',
  templateUrl: './add-edit-size.component.html',
  styleUrls: ['../../../product/components/create-edit-product/create-edit-product.component.scss'],
  animations : [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class AddEditSizeComponent implements OnInit {
  @Input() size:Size;
  sizeTypes:SizeType[];
  @Output() messageEmitter = new EventEmitter<any>();
  errors:any[] =[];
  submitted:boolean;
  sizeForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    type_id: new FormControl('',[Validators.required] )
  });

  constructor(
    public state:StateService,
    private sizeHTTP : SizeService,
    private sizeTypeHTTP : SizeTypeService,
    private loader: NgxUiLoaderService,
    private helper: HelperService
  ) { }

  ngOnInit(): void {
    this.loadSizeTypes();
  }

  ngOnChanges(): void {
    if(this.size){
      this.sizeForm.controls.name.setValue(this.size.name);
      this.sizeForm.controls.type_id.setValue(this.size.type_id);
    }else{
      this.sizeForm.reset();

    }
  }

  loadSizeTypes(){
    this.sizeTypeHTTP.getSizeTypes()
    .subscribe(
      (res)=>this.sizeTypes = res.data,
      (err)=> console.log(err)
    )
  }

  closeModal(message?:any):void{
    this.submitted = false;
    this.sizeForm.reset();
    this.state.toggleModal(false);
    message?this.messageEmitter.emit(message):null;
  }

  create(){
    this.submitted = true;

     if(this.sizeForm.valid)
     {
    this.loader.start();
      let formData = this.sizeForm.value;
       this.sizeHTTP.createSize(formData)
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

     if(this.sizeForm.valid)
     {
    this.loader.start();
    let formData = this.sizeForm.value;
    this.sizeHTTP.updateSize(formData,this.size.id)
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
