import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { Item } from '../interfaces/item.interface';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private readonly _items = new BehaviorSubject<Item[]>([]);
  readonly items$ = this._items.asObservable();

  constructor(private http: HttpClient) { }

  addItem(name: string, quantity: number, price: number) {
    // add jwt
    const token = localStorage.getItem('token');
    let jwtHeader = new HttpHeaders().append('Authorization', `jwt ${token}`)

    // make the request
    this.http.post('/api/items/add', {name: name, qty: quantity, price: price}, {headers: jwtHeader})
    .pipe(catchError(err => throwError('Invalid credentials, please try again')))
    .subscribe(res => {
      // handle response and update state management as needed
      if (res['success']) {
        this.itemsbyUser();
      }
      console.log(res['msg']);
    }, err => console.log(err)) // error function if the observable error-ed out
  }

  removeItem(id: number){
    // add jwt
    const token = localStorage.getItem('token');
    let jwtHeader = new HttpHeaders().append('Authorization', `jwt ${token}`)

    this.http.delete(`/api/items/delete/${id}`, { headers: jwtHeader })
    .pipe(catchError(err => throwError('Invalid credentials, please try again')))
    .subscribe(res => {
      if (res['success']) {

      }
      console.log(res['msg']);
    }, err => console.log(err)) // error function if the observable error-ed out
  }

  itemsbyUser(){
    // add jwt
    const token = localStorage.getItem('token');
    let jwtHeader = new HttpHeaders().append('Authorization', `jwt ${token}`);

    this.http.get('/api/items/user', { headers: jwtHeader })
    .pipe(catchError(err => throwError('Invalid credentials, please try again')))
    .subscribe(res => {
      if (res['success']) {
        this.items = res['items'];
      }
      console.log(res['msg']);
    }, err => console.log(err)) // error function if the observable error-ed out
  }

  clearItems(){ // ran when logout() is called to reset state management
    this.items = [];
  }

  // Items Getters and Setters
  private get items(){
    return this._items.getValue();
  }
  private set items(items: Item[]){
    this._items.next(items)
  }
}
