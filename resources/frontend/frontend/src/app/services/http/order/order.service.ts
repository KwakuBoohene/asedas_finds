import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) {

  }

  public getOrders(){
    return this.http.get<any>(environment.apiUrl+'/api/order');
  }

  public getIPAddress(){
    return this.http.get<any>('https://api64.ipify.org?format=json');
  }

  public getSingleOrder(id){
    return this.http.get<any>(environment.apiUrl+'/api/order/'+id);
  }

  public getReferences(){
    return this.http.get<any>(environment.apiUrl+
      '/api/order-reference');
  }


  public createOrder(body){
    return this.http.post<any>(environment.apiUrl+
      '/api/order',body);
  }

  public linkProductToOrder(
    product_id:number,
    order_id:number,
    size_id:number,
    quantity:number){
    return this.http.post<any>(environment.apiUrl+
      '/api/order-product',{product_id,order_id,size_id,quantity});
  }

  public updateOrder(body,id:number){
    return this.http.post<any>(
      environment.apiUrl+'/api/order/'+id,body);
  }

  public deleteOrder(id:number){
    return this.http.delete<any>(
      environment.apiUrl+'/api/order/'+id);
  }
}
