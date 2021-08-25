import { CategoryService } from 'src/app/services/http/category/category.service';
import { Category } from './../../../../types/data-types';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { StateService } from '../../../../services/state/state.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss']
})
export class ManageCategoriesComponent implements OnInit {

  categories: any[];
  selectedCategory:any;
  deleteCategoryId:number;


  constructor(
    private state: StateService,
    private categoryService : CategoryService,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.state.modal$.
    subscribe(
      (res) => {
        if(!res){
          this.selectedCategory = undefined;
          this.loadCategories();
        }
      }
    )
    this.state.modal2$.
    subscribe(
      (res) => {
        if(!res){
          this.deleteCategoryId = undefined;
          this.loadCategories();
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

  loadCategories():void {
    this.loader.start();
    this.categoryService.getCategories()
    .subscribe(
      (res) =>
      {
        this.categories = res.data;
        this.loader.stop();
      },
      (err)=>{
        this.loader.stop();
      }
    );

  }

  edit(category:Category):void{
    this.selectedCategory = category;
    this.openAddModal();
  }

  delete(id:number){
    this.deleteCategoryId = id;

    this.openDeleteModal();
  }

}
