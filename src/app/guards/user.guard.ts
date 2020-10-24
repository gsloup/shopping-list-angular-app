import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  user: string; // will determine via a boolean whether a user is signed in

  constructor(private userService: UserService, private router: Router){
    this.userService.user$.subscribe(user => this.user = user ? user.username: null)
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      // Route an un-signed user to the login page
      if (this.user === null) {
        this.router.navigate(['/login'])
        return false;
      }

      // Signed in users can access '/shopping-list'
      if(state.url === '/shopping-list') {
        return true;
      }
    
      return true;
  }
  
}
