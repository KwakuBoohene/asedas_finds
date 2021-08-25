import { CategoryService } from './../../../../../services/http/category/category.service';
import { HelperService } from './../../../../../services/helper/helper.service';
import { Product, Category, Size } from './../../../../../types/data-types';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from './../../../../../services/http/product/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StateService } from '../../../../../services/state/state.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { NumericValueType, RxwebValidators } from '@rxweb/reactive-form-validators';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { ImageSnippet } from 'src/app/types/data-types';
import { SizeService } from 'src/app/services/http/size/size.service';


@Component({
  selector: 'app-create-edit-product',
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['./create-edit-product.component.scss'],
  animations : [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class CreateEditProductComponent implements OnInit, OnChanges{
  @Input() product;
  categories:Category[];
  sizes:Size[];

  productImages:any[];
  selectedCategories:number[];
  selectedSizes:number[];
  @Output() messageEmitter = new EventEmitter<any>();
  errors:any[] =[];
  submitted:boolean;
    selectedFiles: ImageSnippet[];
    files:any[];
  productForm = new FormGroup({
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
    active : new FormControl('',
    [Validators.required ]),
    price : new FormControl(''
    ,
    [Validators.required,
      RxwebValidators.numeric({acceptValue: NumericValueType.PositiveNumber,
        allowDecimal:true })
    ]),
    qty_left: new FormControl(1
    ,
    [Validators.required,
      RxwebValidators.numeric({acceptValue: NumericValueType.PositiveNumber,
        allowDecimal:false })
    ])
  });

  constructor(
    public state:StateService,
    private productHTTP : ProductService,
    private categoryHTTP: CategoryService,
    private sizeHTTP:SizeService,
    private loader: NgxUiLoaderService,
    private helper: HelperService
  ) { }

  ngOnInit(): void {
    this.resetComponent();
    this.loadAdditonalDetails();


  }

  loadAdditonalDetails(){
    this.loader.start();
    this.categoryHTTP.getCategories()
    .subscribe(
      (res) => this.categories = res.data,
      err => this.handleErrors(err)
    )
    this.sizeHTTP.getSizes()
    .subscribe(
      (res) => this.sizes = res.data,
      err => this.handleErrors(err)
    )
    this.loader.stop()
  }

  ngOnChanges(): void {
    if(this.product){
      this.getSingleProduct(this.product);
    }else{
      this.resetComponent();
    }
  }

getSingleProduct(product){
  this.productHTTP.getSingleProduct(product.id)
  .subscribe(
    res => {
      console.log(res);
      this.productForm.controls.name.setValue(product.name);
      this.productForm.controls.desc.setValue(product.desc);
      this.productForm.controls.price.setValue(product.price);
      this.productForm.controls.active.setValue(product.active);
      this.productForm.controls.image.clearValidators();
      this.productForm.controls.image.setValidators(
        [RxwebValidators.extension({extensions:['png','jpg','jpeg']})]
      );
      this.productForm.controls.image.updateValueAndValidity();
      this.productForm.controls.qty_left.setValue(this.product.qty_left);
      res.data.categories.map(item => {this.selectedCategories.push(item.category_id.toString() )})
      res.data.sizes.map(item => {this.selectedSizes.push(item.size_id.toString() )})
        this.productImages = res.data.images;
    }
    )
  }

closeModal(message?:any):void{
  this.resetComponent()
  this.state.toggleModal(false);
  message?this.messageEmitter.emit(message):null;
}

resetComponent(){
    this.submitted = false;
    this.productForm.reset();
    this.selectedFiles= [];
    this.selectedCategories =[];
    this.selectedSizes =[];
    this.files = [];
    this.productImages = [];
}

create(){
    this.submitted = true;

     if(this.productForm.valid)
     {
    this.loader.start();
      // let formData = this.helper.createFinalForm(this.productForm,this.selectedFile);
      let formData = this.productForm.value;
      delete formData.image;
       this.productHTTP.createProduct(formData)
       .subscribe(
         (res)=>{
          this.uploadProductImages(res.id);
          this.addProductCategories(res.id);
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
     if(this.productForm.valid)
     {
    this.loader.start();
    let formData = this.helper.formWithoutImage(this.productForm);;
      if(this.productForm.controls.image.value){
        this.updateProductWithImage(formData);
      }
      else{
        this.updateProductRequest(formData,false);
      }
       this.loader.stop();
     }
}

updateProductWithImage(formData){
    this.deleteProductImages(formData)
}

deleteProductImages(formData){
  this.productHTTP.deleteProductImages(this.product.id)
  .subscribe((res)=>{
   this.updateProductRequest(formData,true);
  },
  err => {
    this.handleErrors(err)
    this.closeModal('Oops Something went Wrong');
  }
  )
}

updateProductRequest(formData,hasImage:boolean){
  this.productHTTP.updateProduct(formData,this.product.id)
  .subscribe(
    (res)=>{
      if(hasImage){
        this.uploadProductImages(this.product.id)
      }
      this.addProductCategories(this.product.id);

      this.closeModal(res.message);
    },
  (err)=>{
    this.handleErrors(err);
  }
  )

}

addProductCategories(product_id){
  this.selectedCategories.forEach(
    categoryid =>{
      this.createProductCategory(categoryid,product_id)
    }
  )
  this.addProductSizes(product_id);
}

addProductSizes(product_id){
  this.selectedSizes.forEach(
    size_id =>{
      this.createProductSize(size_id,product_id)
    }
  )
  this.closeModal('Product Successfully Created');
}

createProductCategory(category_id:number,product_id:number){
  this.productHTTP.addProductCategory({category_id,product_id})
  .subscribe(
    res => console.log(res),
    err => this.handleErrors(err)
  )
}

createProductSize(size_id:number,product_id:number){
  this.productHTTP.addProductSize({size_id,product_id})
  .subscribe(
    res => console.log(res),
    err => this.handleErrors(err)
  )
}

uploadProductImages(product_id:number){
  console.log(this.selectedFiles);
  this.selectedFiles.forEach(
    (file)=>{
      let formData = new FormData();
      formData.append('product_id',(product_id.toString()));
      formData.append('image',file.file);
      this.productHTTP.addProductImage(formData)
      .subscribe(
        (res)=>{
        },
        (err)=>{
          this.handleErrors(err);
          this.closeModal('Oops Something went Wrong');
        }
      )
    }
  )

}

  selectFiles(imageInput){
    for (let index = 0; index < imageInput.files.length; index++) {
      this.files.push(imageInput.files[index]);
    }
    this.files.forEach((file)=>{
      this.processFile(file);
    })
  }

 processFile(file: any) {
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {

      this.selectedFiles.push(new ImageSnippet(event.target.result, file));
    });
    reader.readAsDataURL(file);


  }

showErrors(errorObject){
  this.errors = this.helper.getErrorsIntoArray(errorObject);
  this.loader.stop();
  setTimeout(() => {
    this.errors = undefined;
  }, 1000);

}

handleErrors(err){
  console.log(err);
  this.loader.stop();
}

toggleCategory($event){
  if ($event.target.checked) {
    this.selectedCategories.push($event.target.value);
  } else {
    let position = this.selectedCategories.indexOf($event.target.value);
    position!==-1?this.selectedCategories.splice(position,1):null;
  }
  console.log(this.selectedCategories);
}

toggleSize($event){
  if ($event.target.checked) {
    this.selectedSizes.push($event.target.value);
  } else {
    let position = this.selectedSizes.indexOf($event.target.value);
    position!==-1?this.selectedSizes.splice(position,1):null;
  }
  console.log(this.selectedSizes);
}




}
