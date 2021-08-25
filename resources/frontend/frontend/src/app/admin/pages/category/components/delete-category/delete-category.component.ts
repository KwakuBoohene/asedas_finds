import { Component, Input, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/http/category/category.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['../../../product/components/create-edit-product/create-edit-product.component.scss']
})
export class DeleteCategoryComponent implements OnInit {

  @Input() category_id:number;
  submitted:boolean;

  constructor(
    private categoryHTTP : CategoryService,
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
    this.categoryHTTP.deleteCategory(this.category_id)
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
