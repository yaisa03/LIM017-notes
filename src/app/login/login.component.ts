import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
    ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.userService.login(this.formLogin.value.email, this.formLogin.value.password)
    .then(response => {
      console.log(response);
      this.formLogin.reset();
      this.router.navigate(['/notes']);
    })
    .catch(err => console.log(err));
  }

  onClick(){
    this.userService.loginWithGoogle()
    .then((response) => {
      console.log(response);
      this.formLogin.reset();
      this.router.navigate(['/notes']);
    })
    .catch(err => console.log(err));
  }
  

}
