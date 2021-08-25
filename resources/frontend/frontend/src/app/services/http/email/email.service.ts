import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private http:HttpClient
  ) { }

  public shoppingRequest(body){
    return this.http.post<any>(environment.apiUrl+
    '/api/shopping-request',body);
  }

  public resale(body){
    return this.http.post<any>(environment.apiUrl+
    '/api/resale',body);
  }

  public contactUs(body){
    return this.http.post<any>(environment.apiUrl+
    '/api/contact-us',body);
  }

  public giftBox(body){
    return this.http.post<any>(environment.apiUrl+
    '/api/gift-box',body);
  }

  public giftVoucher(body){
    return this.http.post<any>(environment.apiUrl+
    '/api/gift-voucher',body);
  }
}
