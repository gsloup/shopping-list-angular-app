import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  username: string;
  password: string;

  constructor(private userService: UserService, private _snackBar: MatSnackBar) { }


  signup() {
    this.userService.signup(this.username, this.password);
  }
  

  ngOnInit(): void {
  }
  

}
