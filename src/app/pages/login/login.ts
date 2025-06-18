import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { Administradores } from '../../services/administradores/administradores';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  // imports: [],
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  errorMsg: string = "";

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private administradoresService: Administradores
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required],
    })
  }

  // logar() {
  //   if (this.loginForm.valid) {
  //     const usuario = this.loginForm.get('usuario')?.value;
  //     const senha = this.loginForm.get('senha')?.value;

  //     if (usuario === 'admin' && senha === '1234') {
  //       console.log('Login bem-sucedido');
  //       this.router.navigate(['/dashboard']);
  //     } else {
  //       alert('Usuário ou senha incorretos!');
  //     }
  //   } else {
  //     this.loginForm.markAllAsTouched();
  //     alert('Preencha todos os campos!');
  //   }
  // }

  get usuario() { return this.loginForm.get('usuario'); }
  get senha() { return this.loginForm.get('senha'); }

  logar() {
    if (this.loginForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos obrigatórios',
        text: 'Por favor, preencha todos os campos para continuar.',
      });
      return;
    }

    const usuario = this.loginForm.get('usuario')?.value;
    const senha = this.loginForm.get('senha')?.value;

    this.administradoresService.login(usuario, senha).subscribe({
      next: (res) => {
        if (res.login === 'login realizado') {
          Swal.fire({
            icon: 'success',
            title: 'Login realizado!',
            timer: 1500,
            showConfirmButton: false
          });
          this.paginaAdm();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: res.message || 'Usuário ou senha incorretos.',
          });
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro de autenticação',
          text: 'Usuário ou senha incorretos.',
        });
      },
    });
  }


  paginaAdm() {
    this.router.navigate(['/dashboard']);
  }

}
