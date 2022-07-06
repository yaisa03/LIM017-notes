import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(private userService: UserService) {
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
    })
    .catch(err => console.log(err));
  }
  

}
