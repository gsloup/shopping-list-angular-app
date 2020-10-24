import { Component } from '@angular/core';
import { User } from './interfaces/user.interface';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shopping-list-ang-app';
  user: User;

  constructor(private userService: UserService){
    // Will display a logout button if a user is present
    this.userService.user$.subscribe(user => this.user = user);
  }
  
  logout() {
    this.userService.logout();
  }
}
