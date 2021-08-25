import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) {

  }

  public getProducts(){
    return this.http.get<any>(environment.apiUrl+'/api/product');
  }

  public getSingleProduct(id){
    return this.http.get<any>(environment.apiUrl+'/api/product/'+id);
  }

  public getActiveProducts(){
    return this.http.get<any>(environment.apiUrl+'/api/product-active');
  }

  public createProduct(body){
    return this.http.post<any>(environment.apiUrl+
      '/api/product',body);
  }

  public updateProduct(body,id:number){
    return this.http.post<any>(
      environment.apiUrl+'/api/product/'+id,body);
  }

  public updateProductQuantity(quantity:number,id:number){
    return this.http.put<any>(
      environment.apiUrl+'/api/product/update-quantity/'+id,{quantity});
  }


  public deleteProduct(id:number){
    return this.http.delete<any>(
      environment.apiUrl+'/api/product/'+id);
  }

  public addDiscount(id:number,discount_id:number){
    let body = {
      discount_id
    };
    return this.http.put<any>(
      environment.apiUrl+'/api/product/add-discount/'+id,body
    );
  }

  public removeDiscount(id:number,discount_id:number){
    let body = {
      discount_id
    };
    return this.http.put<any>(
      environment.apiUrl+'/api/product/remove-discount/'+id,body
    );
  }

  public addProductImage(body){
    return this.http.post<any>(
      environment.apiUrl+'/api/product-image/',body
    );
  }

  public deleteSingleProductImage(id:number){
    return this.http.delete<any>(
      environment.apiUrl+'/api/product-image/'+id);
  }

  public deleteProductImages(id:number){
    return this.http.delete<any>(
      environment.apiUrl+'/api/product-image/delete-multiple/'+id
    )
  }

  public addProductCategory(body){
    return this.http.post<any>(
      environment.apiUrl+'/api/product-category',body
    )
  }

  public addProductSize(body){
    return this.http.post<any>(
      environment.apiUrl+'/api/product-size',body
    )
  }

  public getProductsByCategory(id){
    return this.http.get<any>(environment.apiUrl+'/api/product-category/by-category/'+id);
  }


}
