import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { Item } from '../interfaces/item.interface';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  // STATE MANAGEMENT
  private readonly _items = new BehaviorSubject<Item[]>([]);
  readonly items$ = this._items.asObservable();

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  // ADD ITEM
  addItem(name: string, quantity: number, price: number) {
    // Add jwt
    const token = localStorage.getItem('token');
    let jwtHeader = new HttpHeaders().append('Authorization', `jwt ${token}`)

    // Make the request
    this.http.post('/api/items/add', {name: name, qty: quantity, price: price}, {headers: jwtHeader})
    .pipe(catchError(err => throwError('Invalid credentials, please try again')))
    .subscribe(res => {
      // Handle response and update state management as needed
      if (res['success']) {
        this.itemsbyUser(); // Retrieves the updated items list
      }
      // Give user appropriate message using a snack bar
      this._snackBar.open(res['msg'], null, {
        duration: 1500,
      });      
    }, err => console.log(err)) // Error function if the observable error-ed out
  }

  // REMOVE ITEM
  removeItem(id: number){
    // Add jwt
    const token = localStorage.getItem('token');
    let jwtHeader = new HttpHeaders().append('Authorization', `jwt ${token}`)

    this.http.delete(`/api/items/delete/${id}`, { headers: jwtHeader })
    .pipe(catchError(err => throwError('Invalid credentials, please try again')))
    .subscribe(res => {
      if (res['success']) {
        this.itemsbyUser(); // Retrieves the updated items list
      }
      // Give user appropriate message using a snack bar
      this._snackBar.open(res['msg'], null, {
        duration: 1500,
      });      
    }, err => console.log(err)) // Error function if the observable error-ed out
  }

  // GET ALL USER'S ITEMS
  itemsbyUser(){
    // Add jwt
    const token = localStorage.getItem('token');
    let jwtHeader = new HttpHeaders().append('Authorization', `jwt ${token}`);

    this.http.get('/api/items/user', { headers: jwtHeader })
    .pipe(catchError(err => throwError('Invalid credentials, please try again')))
    .subscribe(res => {
      if (res['success']) {
        this.items = res['items'];
      }
    }, err => console.log(err)) // Error function if the observable error-ed out
  }

  // CLEAR ITEMS
  clearItems(){ // Runs when logout() is called to reset state management
    this.items = [];
  }

  // ITEMS GETTER AND SETTER
  private get items(){
    return this._items.getValue();
  }
  private set items(items: Item[]){
    this._items.next(items)
  }
}
