import { HelperService } from './../../../../../services/helper/helper.service';
import { CategoryService } from 'src/app/services/http/category/category.service';
import { Category, ImageSnippet } from './../../../../../types/data-types';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { StateService } from 'src/app/services/state/state.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-create-edit-category',
  templateUrl: './create-edit-category.component.html',
  styleUrls: ['../../../product/components/create-edit-product/create-edit-product.component.scss'],
  animations : [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class CreateEditCategoryComponent implements OnInit , OnChanges{
  @Input() category:Category;
  @Output() messageEmitter = new EventEmitter<any>();
  submitted:boolean;
    selectedFile: ImageSnippet;
  categoryForm = new FormGroup({
    name: new FormControl('',
    [Validators.required]),
    desc : new FormControl(''
    ,
    [Validators.required]),
    image : new FormControl('',
    [Validators.required,
    RxwebValidators.extension({extensions:[
      'png','jpg','jpeg'
      ]})
    ]),
  });

  constructor(
    public state:StateService,
    private categoryHTTP : CategoryService,
    private loader: NgxUiLoaderService,
    private helper: HelperService
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if(this.category){
      this.categoryForm.controls.name.setValue(this.category.name);
      this.categoryForm.controls.desc.setValue(this.category.desc);
      this.categoryForm.controls.image.clearValidators();
      this.categoryForm.controls.image.setValidators(
        [RxwebValidators.extension({extensions:['png','jpg','jpeg']})]
      );
      this.categoryForm.controls.image.updateValueAndValidity();
    }else{
      this.resetComponent();
    }
  }

  resetComponent(){
    this.submitted = false;
    this.categoryForm.controls.image.reset();
    this.categoryForm.reset();
    this.selectedFile = undefined;

  }

  closeModal():void{
    this.resetComponent();
    this.state.toggleModal(false);
  }

  create(){
    this.submitted = true;

     if(this.categoryForm.valid)
     {
    this.loader.start();
      let formData = this.createFinalForm();
       this.categoryHTTP.createCategory(formData)
       .subscribe(
         (res)=>{
           this.messageEmitter.emit(res.message);
           this.closeModal();
         },
         (err)=>{
           console.log(err);

         }
       )
       this.loader.stop();
     }
  }

  edit(){
    this.submitted = true;

     if(this.categoryForm.valid)
     {
    this.loader.start();
    let formData;
      if(this.categoryForm.controls.image.value){
        formData = this.helper.createFinalForm(this.categoryForm,this.selectedFile);
        this.categoryHTTP.updateCategory(formData,this.category.id)
       .subscribe(
         (res)=>{
           this.closeModal();
         },
         (err)=>{
           console.log(err);
         }
       )
      }
      else{
        formData = this.helper.formWithoutImage(this.categoryForm);
        this.categoryHTTP.updateCategory(formData,this.category.id)
       .subscribe(
         (res)=>{
           this.closeModal();
         },
         (err)=>{
           console.log(err);
         }
       )
      }


       this.loader.stop();
     }

  }

  createFinalForm():FormData{
    this.categoryForm.controls.image.setValue(this.selectedFile.file);
      let formData = new FormData();
      for (let key in this.categoryForm.value) {
        formData.append(key, this.categoryForm.value[key]);
      }
      formData.set('image',this.selectedFile.file);
      return formData;
  }

  formWithoutImage(){
   let formData = this.categoryForm.value;
    delete formData.image;
    return formData;
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }
}
