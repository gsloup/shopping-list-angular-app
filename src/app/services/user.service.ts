import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { ItemsService } from './items.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // STATE MANAGEMENT
  private readonly _user = new BehaviorSubject<User>(null)
  readonly user$ = this._user.asObservable();

  constructor(private router: Router, private http: HttpClient, private itemsService: ItemsService, private _snackBar: MatSnackBar) { }

  // LOGIN
  login(username: string, password: string){
    this.http.post('/api/users/login', {username: username, password: password}).subscribe(res => {
      if (res['success']) {
        this.user = res['user'];
        
        localStorage.setItem('token', res["jwt"]); // Will be cleared when user logs out
        this.itemsService.itemsbyUser();           // Initial retrieval of user's items from DB
        this.router.navigate(['/shopping-list']);
      }
      // Give user appropriate message using a snack bar
      this._snackBar.open(res['msg'], null, {
        duration: 2500,
      });
    })  
  }
  
  // SIGN UP
  signup(username: string, password: string){ 
    this.http.post('/api/users/signup', {username: username, password: password}).subscribe(res => {
      if (res['success']) {
        this.login(username, password); // automatically logs in new user if successfully signs up
      }
      // Give user appropriate message using a snack bar
      this._snackBar.open(res['msg'], null, { 
        duration: 3500,
      });
    })  
  }

  // LOG OUT
  logout(){
    this.user = null;                 // clears user state management
    this.itemsService.clearItems();   // clears items state management
    localStorage.removeItem('token'); // removes JWT from local storage
    this.router.navigate(['/login']);
  }

  // USER GETTER AND SETTER
  private get user(){
    return this._user.getValue();
  }
  private set user(u: User){
    this._user.next(u);
  }

}
