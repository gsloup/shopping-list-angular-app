import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { ItemsService } from './items.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _user = new BehaviorSubject<User>(null)
  readonly user$ = this._user.asObservable();

  constructor(private router: Router, private http: HttpClient, private itemsService: ItemsService) { }

  // Login
  login(username: string, password: string){
    this.http.post('/api/users/login', {username: username, password: password}).subscribe(res => {
      if (res['success']) {
        this.user = res['user'];
        
        localStorage.setItem('token', res["jwt"]);
        this.itemsService.itemsbyUser();
        this.router.navigate(['/shopping-list']);
      }
      console.log(res['msg']);
    
    })  
  }
  
  // Sign Up
  signup(username: string, password: string){ 
    this.http.post('/api/users/signup', {username: username, password: password}).subscribe(res => {
      if (res['success']) {
        this.router.navigate(['/login']);
      }
      console.log(res['msg']);
    
    })  
  }

  // Log Out
  logout(){
    this.user = null;                 // clears user state management
    this.itemsService.clearItems();   // clears items state management
    localStorage.removeItem('token'); // removes JWT from local storage
    this.router.navigate(['/login']);
  }

  // Getters and Setters for state management
  private get user(){
    return this._user.getValue();
  }
  private set user(u: User){
    this._user.next(u);
  }

}
