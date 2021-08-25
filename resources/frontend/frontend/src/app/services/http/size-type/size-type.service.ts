import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SizeTypeService {

  constructor(
    private http: HttpClient
  ) { }

  public getSizeTypes(){
    return this.http.get<any>(environment.apiUrl+'/api/size-type');
  }

  public createSizeType(body){
    return this.http.post<any>(environment.apiUrl+
      '/api/size-type',body);
  }

  public updateSizeType(body,id:number){
    return this.http.put<any>(
      environment.apiUrl+'/api/size-type/'+id,body);
  }

  public deleteSizeType(id:number){
    return this.http.delete<any>(
      environment.apiUrl+'/api/size-type/'+id);
  }
}
