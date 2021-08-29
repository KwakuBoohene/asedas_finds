import { environment } from 'src/environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/http/category/category.service';


@Component({
  selector: 'app-custom-carousel',
  templateUrl: './custom-carousel.component.html',
  styleUrls: ['./custom-carousel.component.scss']
})
export class CustomCarouselComponent implements OnInit {

  categories:any[] = [];
  environment = environment;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories()
    .subscribe(
      (res) =>{
        this.categories = res.data;
      }
    )
  }

  returnUrlString(url:string){
    return `url(${environment.apiUrl}/storage/images/${url})`
  }

  shopByCategory(id){
    this.router.navigate(['/shop'],{ queryParams: { category: id  } })
  }

}
