import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/http/category/category.service';
import { SessionStorageService } from 'ngx-webstorage';
import { Item, Product, Category } from './../../types/data-types';
import { StateService } from 'src/app/services/state/state.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from './../../services/http/product/product.service';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})


export class ShopComponent implements OnInit {
  products:any[] = [];
  products2:any[] = [];
  cart: Item[] = [];
  categories:Category[] = [];
  selectedCategory='';
  sortOption='';

  constructor(
    private productHTTP: ProductService,
    private loader: NgxUiLoaderService,
    private state: StateService,
    private session: SessionStorageService,
    private categoryHTTP: CategoryService,
    private router: Router,
    private active_route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cart = this.session.retrieve('cart')?this.session.retrieve('cart'):[];
    this.loader.start();
    this.state.cart$.subscribe(
      res => this.session.store('cart',res)
    );
    this.loadCategories();
    this.active_route.queryParams.subscribe(
      params => {
        if(params.category){
          this.selectedCategory = params.category;
         this.loadProductsByCategory(params.category);
        }else{
          this.loadProducts()
        }
       ;
      }
    )


  }

  changeCategory(){
    this.router.navigate(['/shop'],{ queryParams: { category: this.selectedCategory  } })
  }

  addToCart(product: Product){

  }

  loadProducts(){
    this.productHTTP.getActiveProducts()
    .subscribe(
      (res)=>{
        this.products = res.data;

      }
    );
  }

  loadProductsByCategory(id){
    this.loader.start();
    this.productHTTP.getProductsByCategory(id).subscribe(
      res=>{
        this.products = [];
        res.data.forEach(category => {
          if(category.product.qty_left>0){
            this.products.push(category.product);
          }
        })
        this.loader.stop();
        ;
      },
      err => {
        this.loader.stop();
      }
    )
  }

  loadCategories(){
    this.loader.start();
    this.categoryHTTP.getCategories()
    .subscribe(
      (res)=>{
        {this.categories = res.data;
          this.loader.stop();
        }
      }
    );
  }

  viewItem(product:Product){
    this.router.navigate(['/item'], { queryParams: { id: product.id } })
  }

  sort(){
    this.loader.start()
    let products = [];
    switch (this.sortOption) {
      case '0':
        this.products.forEach(
          product => {
            if(product.discount){
              products.push(product)
            }
          }
        )
        this.products.forEach(
          product => {
            if(!product.discount){
              products.push(product)
            }
          }
        )
        this.products = products;
        break;
        case '1':
        this.products.sort((a,b)=>
        {
          return a.price -b.price;
        })
        break;
        case '2':
        this.products.sort((a,b)=>
        {
          return b.price -a.price;
        })
        break;

      default:
        break;
    }
    this.loader.stop();
  }

}
