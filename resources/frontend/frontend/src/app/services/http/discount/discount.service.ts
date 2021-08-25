import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(
    private http: HttpClient
  ) {

  }

  public getDiscounts(){
    return this.http.get<any>(environment.apiUrl+'/api/discount');
  }

  public createDiscount(body){
    return this.http.post<any>(environment.apiUrl+
      '/api/discount',body);
  }

  public updateDiscount(body,id:number){
    return this.http.put<any>(
      environment.apiUrl+'/api/discount/'+id,body);
  }

  public deleteDiscount(id:number){
    return this.http.delete<any>(
      environment.apiUrl+'/api/discount/'+id);
  }

  
}
