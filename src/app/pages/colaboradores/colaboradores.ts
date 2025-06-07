import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionarios } from '../../services/funcionarios/funcionarios';

@Component({
  selector: 'app-colaboradores',
  // imports: [],
  standalone: false,
  templateUrl: './colaboradores.html',
  styleUrl: './colaboradores.css'
})
export class Colaboradores {
  funcionario: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private funcionarioService: Funcionarios) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.funcionarioService.getFuncionarioDetalhado(id).subscribe(data => {
      this.funcionario = data;
    });
  }

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
