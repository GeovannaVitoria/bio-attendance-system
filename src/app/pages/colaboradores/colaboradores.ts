import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-colaboradores',
  // imports: [],
  standalone: false,
  templateUrl: './colaboradores.html',
  styleUrl: './colaboradores.css'
})
export class Colaboradores {
  constructor(private router: Router) { }

  paginaColaboradores() {
    this.router.navigate(['/colaboradores']);
  }

  paginaAdm() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
