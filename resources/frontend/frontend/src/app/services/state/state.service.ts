import { Item, Product } from './../../types/data-types';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _sidebarSource = new Subject<boolean>();
  private _notification = new Subject<boolean>();
  private _message = new BehaviorSubject<string>('');
  private _modalSubject = new Subject<boolean>();
  private _modalSubject2 = new Subject<boolean>();
  private _cartSubject = new Subject<Item[]>();



  sidebar$ = this._sidebarSource.asObservable();
  modal$ = this._modalSubject.asObservable();
  modal2$ = this._modalSubject2.asObservable();
  cart$ = this._cartSubject.asObservable();
  notification$ = this._notification.asObservable();
  message$ = this._message.asObservable();

  constructor() {

   }

  toggleSidebar(bool: boolean){
    this._sidebarSource.next(bool);
  }

  toggleModal(bool: boolean){
    this._modalSubject.next(bool)
  }

  toggleModal2(bool: boolean){
    this._modalSubject2.next(bool)
  }

  toggleNotification(bool:boolean){
    this._notification.next(bool);
  }

  sendMessage(message:string){
    this._message.next(message);
  }

  addToCart(cart:Item[]){
   this._cartSubject.next(cart);
  }

}
