import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(
    private http: HttpClient
  ) { }

  public getSizes(){
    return this.http.get<any>(environment.apiUrl+'/api/size');
  }

  public getSingleSize(id:number){
    return this.http.get<any>(environment.apiUrl+'/api/size/'+id);
  }

  public createSize(body){
    return this.http.post<any>(environment.apiUrl+
      '/api/size',body);
  }

  public updateSize(body,id:number){
    return this.http.put<any>(
      environment.apiUrl+'/api/size/'+id,body);
  }

  public deleteSize(id:number){
    return this.http.delete<any>(
      environment.apiUrl+'/api/size/'+id);
  }
}
