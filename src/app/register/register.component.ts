import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
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
        .catch(err => {
          let errMessage = "";
          switch (err.message) {
            case 'Firebase: Error (auth/email-already-in-use).':
              errMessage = 'email ya registrado';
              break;
            case 'Firebase: Error (auth/internal-error).':
              errMessage = 'ingresar contraseña';
              break;
            case 'Firebase: Error (auth/invalid-email).':
              errMessage = 'email invalido';
              break;
            case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
              errMessage = 'la contraseña debe tener al menos 6 caracteres';
              break;
            case 'Firebase: Error (auth/missing-email).':
              errMessage = 'ingresar email';
              break;
            default:
              break;
          }
          console.log(err.message)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errMessage,
            heightAuto: false
          })
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'las contraseñas son diferentes',
        heightAuto: false
      })
    }
  }

  onClick() {
    this.userService.loginWithGoogle()
      .then((response) => {
        console.log(response);
        this.formRegister.reset();
        this.router.navigate(['/notes']);
      })
      .catch(err => console.log(err));
  }

  onBlur(event: Event) {
    const input = (event.target as HTMLInputElement);
    const label = (input.nextElementSibling as HTMLInputElement);
    return (input.value != "") ? label.classList.add("filled") : label.classList.remove("filled");
  }

  showPasswordOne: boolean = false;
  showPassword: boolean = false;
}
