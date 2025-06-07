import { Component } from '@angular/core';
import { Funcionarios } from '../../services/funcionarios/funcionarios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  // imports: [],
  standalone: false,
  templateUrl: './menu-lateral.html',
  styleUrl: './menu-lateral.css'
})
export class MenuLateral {
  funcionarios: any[] = [];

 constructor(
    private router: Router,
    private funcionarioService: Funcionarios,
  ) { }
  ngOnInit(): void {

    this.funcionarioService.getListaFuncionarios().subscribe(data => {
      this.funcionarios = data;
    });
  }

  irParaColaborador(id: number) {
    this.router.navigate(['/colaboradores', id]);
  }


}
