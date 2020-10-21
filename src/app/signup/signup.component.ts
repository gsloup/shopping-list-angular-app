import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  username: string;
  password: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  signup() {
    this.userService.signup(this.username, this.password);
  }

}
