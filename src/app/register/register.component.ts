import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;

  constructor(private userService: UserService) {
    this.formRegister = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      passwordConf: new FormControl(),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formRegister.value.password === this.formRegister.value.passwordConf) {
      this.userService.register(this.formRegister.value.email, this.formRegister.value.password)
        .then(response => {
          console.log(response);
          this.formRegister.reset();
        })
        .catch(err => console.log(err));
    }
  }
}
