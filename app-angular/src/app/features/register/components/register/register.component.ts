import { User } from 'src/app/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {

  private registeredUsers: User[] = [];

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$")]),
    password1: new FormControl('', [Validators.required, Validators.minLength(10)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(10)]),
    check: new FormControl(false, [Validators.requiredTrue])
  });

  userControl = this.loginForm.controls['email'];
  passwordControl1 = this.loginForm.controls['password1'];
  passwordControl2 = this.loginForm.controls['password2'];
  checkControl = this.loginForm.controls['check'];

  constructor(
    private registerService: RegisterService
  ) {
    console.log('REGISTER - CONSTRUCTOR');
  }
  ngAfterViewInit(): void {
    console.log('REGISTER - AFTER VIEW INIT');
  }
  ngOnDestroy(): void {
    console.log('REGISTER - ON DESTROY');
  }

  ngOnInit(): void {
    console.log('REGISTER - ON INIT');
  }
  register() {

    if (this.passwordControl1.value === this.passwordControl2.value) {
      const req = this.registerService.registerUser({ user: this.userControl.value, password: this.passwordControl1.value });
      if (req != null)
        req.subscribe((data) => {
          alert('Registro Exitoso. Bienvenido');
          location.reload();
        })
      else
        alert('El correo ingresado ya se encuentra registrado');
    }
    else
      alert('Las contraseñas no coinciden')
  }

}
