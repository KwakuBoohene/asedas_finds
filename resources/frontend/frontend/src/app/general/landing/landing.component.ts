import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from './../../services/http/category/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  categories:any[] = [];

  constructor(
    private categoryService: CategoryService,
    private loader:NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.loader.start();
    this.categoryService.getCategories()
    .subscribe(
      (res) =>{
        this.categories = res.data;
        this.loader.stop();
      }

    )
  }

}
