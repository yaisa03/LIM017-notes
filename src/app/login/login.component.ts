import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

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

  onSubmit() {
    this.userService.login(this.formLogin.value.email, this.formLogin.value.password)
      .then(response => {
        console.log(response);
        this.formLogin.reset();
        this.router.navigate(['/notes']);
      })
      .catch(err => {
        let errMessage="";
        switch (err.message) {
          case 'Firebase: Error (auth/internal-error).':
            errMessage = 'ingresar contraseña';
            break;
          case 'Firebase: Error (auth/invalid-email).':
            errMessage = 'email invalido';
            break;
          case 'Firebase: Error (auth/user-not-found).':
            errMessage = 'usuario no encontrado';
            break;
          case 'Firebase: Error (auth/wrong-password).':
            errMessage = 'contraseña incorrecta';
            break;
          case 'Firebase: Error (auth/missing-email).':
            errMessage = 'ingresar email';
            break;
          default:
            break;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errMessage,
          heightAuto: false
        })
      });
  }

  onClick() {
    this.userService.loginWithGoogle()
      .then((response) => {
        console.log(response);
        this.formLogin.reset();
        this.router.navigate(['/notes']);
      })
      .catch(err => console.log(err));
  }

  onBlur(event: Event) {
    const input = (event.target as HTMLInputElement);
    const label = (input.nextElementSibling as HTMLInputElement);
    if (input.value != "") {
      label.classList.add("filled");
      console.log('Focus Is Lost for this Element flled');
    } else {
      label.classList.remove("filled");
      console.log('Focus Is Lost for this Element unfilled');
    }
  }

}
