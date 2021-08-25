import { SessionStorageService } from 'ngx-webstorage';
import { AuthObject } from './../../../types/data-types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginVar:boolean;
  constructor(
    private http: HttpClient,
    private session:SessionStorageService
  ) {
     this.loginVar = this.session.retrieve('isLoggedIn');
   }

  public login(auth:AuthObject){
    return this.http.post<any>(
      environment.apiUrl+'/api/login',auth
    );
  }

  public isLoggedIn(){
    this.loginVar = this.session.retrieve('isLoggedIn');
    return this.loginVar
  }
}
