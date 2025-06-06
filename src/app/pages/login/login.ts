import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  // imports: [],
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required],
    })
  }

  // logar() {
  //   if (this.loginForm.valid) {
  //     this.router.navigate(['/dashboard']);
  //   } else{
  //     alert('Erro');
  //   }
  // }

  logar() {
    if (this.loginForm.valid) {
      const usuario = this.loginForm.get('usuario')?.value;
      const senha = this.loginForm.get('senha')?.value;

      if (usuario === 'admin' && senha === '1234') {
        console.log('Login bem-sucedido');
        this.router.navigate(['/dashboard']);
      } else {
        alert('Usuário ou senha incorretos!');
      }
    } else {
      this.loginForm.markAllAsTouched();
      alert('Preencha todos os campos!');
    }
  }


  paginaAdm() {
    this.router.navigate(['/dashboard']);
  }

  get usuario() {
    return this.loginForm.get('usuario');
  }

  get senha() {
    return this.loginForm.get('senha');
  }

}
