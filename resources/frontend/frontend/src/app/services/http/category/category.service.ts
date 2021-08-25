import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  public getCategories(){
    return this.http.get<any>(environment.apiUrl+'/api/category');
  }

  public createCategory(body){
    return this.http.post<any>(environment.apiUrl+
      '/api/category',body);
  }

  public updateCategory(body,id:number){
    return this.http.post<any>(
      environment.apiUrl+'/api/category/'+id,body);
  }

  public deleteCategory(id:number){
    return this.http.delete<any>(
      environment.apiUrl+'/api/category/'+id);
  }
}
