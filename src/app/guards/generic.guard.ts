import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class GenericGuard implements CanActivate {

  user: string; // will determine via a boolean whether a user is signed in

  constructor(private userService: UserService, private router: Router){
    this.userService.user$.subscribe(user => this.user = user ? user.username: null)
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // If a user is not signed in, they will be allowed to access '/login' or '/signup'
      if (this.user === null) {
        return true;
      }
      // Will not let signed in users access '/login' or '/signup'
      this.router.navigate(['/shopping-list']);
      return false;
  }
  
}
