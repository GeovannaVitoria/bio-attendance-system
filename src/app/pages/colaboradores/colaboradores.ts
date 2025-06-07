import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionarios } from '../../services/funcionarios/funcionarios';
import { RegistroPonto } from '../../services/registro-ponto/registro-ponto';

@Component({
  selector: 'app-colaboradores',
  // imports: [],
  standalone: false,
  templateUrl: './colaboradores.html',
  styleUrl: './colaboradores.css'
})
export class Colaboradores {
  funcionario: any;
  saldoHoras: any;
  horasTrabalhadasSemana: any;
  faltasSemana: any;
  pontosSemana: any;
  horasPorDiaSemana: any;
  resumoMensal: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private funcionarioService: Funcionarios,
    private registroPontoService: RegistroPonto,
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.funcionarioService.getFuncionarioDetalhado(id).subscribe(data => {
      this.funcionario = data;
    });
    this.loadSaldoHoras(id);
    this.loadHorasTrabalhadasSemana(id);
    this.loadFaltasSemana(id);
    this.loadPontosSemana(id);
    this.loadHorasPorDiaSemana(id);
    this.loadResumoMensal(id);
  }


  loadSaldoHoras(id: number) {
    this.registroPontoService.getSaldoHoras(id).subscribe(
      (res: any) => this.saldoHoras = res,
      (err: any) => console.error('Erro ao buscar saldo de horas', err)
    );
  }
  funcionarioId(funcionarioId: any) {
    throw new Error('Method not implemented.');
  }

  loadHorasTrabalhadasSemana(id: number) {
    this.registroPontoService.getHorasTrabalhadasSemana(id).subscribe(
      (res: any) => this.horasTrabalhadasSemana = res,
      (err: any) => console.error('Erro ao buscar horas trabalhadas na semana', err)
    );
  }

  loadFaltasSemana(id: number) {
    this.registroPontoService.getFaltasSemana(id).subscribe(
      (res: any) => this.faltasSemana = res,
      (err: any) => console.error('Erro ao buscar faltas na semana', err)
    );
  }

  loadPontosSemana(id: number) {
    this.registroPontoService.getPontosSemana(id).subscribe(
      (res: any) => this.pontosSemana = res,
      (err: any) => console.error('Erro ao buscar pontos da semana', err)
    );
  }

  loadHorasPorDiaSemana(id: number) {
    this.registroPontoService.getHorasPorDiaSemana(id).subscribe(
      (res: any) => this.horasPorDiaSemana = res,
      (err: any) => console.error('Erro ao buscar horas por dia da semana', err)
    );
  }

  loadResumoMensal(id: number) {
    const ano = 2025;
    const mes = 6;
    this.registroPontoService.getResumoMensal(ano, mes, id).subscribe(
      (res: any) => this.resumoMensal = res,
      (err: any) => console.error('Erro ao buscar resumo mensal', err)
    );
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
