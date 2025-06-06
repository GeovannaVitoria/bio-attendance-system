import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Funcionarios } from '../../services/funcionarios/funcionarios';
import { RegistroPonto } from '../../services/registro-ponto/registro-ponto';
import { Administradores } from '../../services/administradores/administradores';

@Component({
  selector: 'app-dashboard',
  // imports: [],
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  colaboradoresAtivos: number | undefined;
  mediaHorasTrabalhadas: string = '';
  quantidadeAtrasos: number | undefined;
  relacaoHorasExtras: any;
  relatorioSaldoMensal: any;
  saldoHoras: any;
  horasTrabalhadasSemana: any;
  faltasSemana: any;
  pontosSemana: any;
  horasPorDiaSemana: any;
  resumoMensal: any;
  usuario: string = '';
  senha: string = '';
  mensagem: string = '';

  funcionarioId = 1; // mock

  constructor(
    private router: Router,
    private funcionarioService: Funcionarios,
    private registroPontoService: RegistroPonto,
    private administradoresService: Administradores,
  ) { }

  ngOnInit(): void {
    this.loadColaboradoresAtivos();
    this.loadMediaHoras();
    this.loadQtdAtrasos();
    this.loadQtdHorasExtras();
    this.loadRelatorioSaldos();
    this.loadSaldoHoras();
    this.loadHorasTrabalhadasSemana();
    this.loadFaltasSemana();
    this.loadPontosSemana();
    this.loadHorasPorDiaSemana();
    this.loadResumoMensal();
  }

  formatarHoras(horaStr: string): string {
    if (!horaStr) return '0h';
    const horas = parseInt(horaStr.split(':')[0], 10);
    return `${horas}h`;
  }

  // Funcionarios Service
  loadColaboradoresAtivos() {
    this.funcionarioService.getQuantidadeColaboradoresAtivos().subscribe(
      resposta => this.colaboradoresAtivos = resposta,
      erro => console.error('Erro ao buscar colaboradores ativos', erro)
    );
  }

  // Registro-Ponto Service
  loadMediaHoras() {
    this.registroPontoService.getMediaHorasTrabalhadas().subscribe(
      resposta => this.mediaHorasTrabalhadas = resposta,
      erro => console.error('Erro ao buscar média de horas', erro)
    );
  }

  loadQtdAtrasos() {
    this.registroPontoService.getQuantidadeAtrasos().subscribe(
      resposta => this.quantidadeAtrasos = resposta,
      erro => console.error('Erro ao buscar atrasos', erro)
    );
  }

  loadQtdHorasExtras() {
    this.registroPontoService.getRelacaoHorasExtras().subscribe(
      resposta => this.relacaoHorasExtras = resposta,
      erro => console.error('Erro ao buscar top 5 horas extras', erro)
    );
  }

  loadRelatorioSaldos() {
    this.registroPontoService.getRelatorioSaldoSemanal().subscribe(
      resposta => this.relatorioSaldoMensal = resposta,
      erro => console.error('Erro ao buscar relatório de saldos', erro)
    );
  }

  loadSaldoHoras() {
    this.registroPontoService.getSaldoHoras(this.funcionarioId).subscribe(
      res => this.saldoHoras = res,
      err => console.error('Erro ao buscar saldo de horas', err)
    );
  }

  loadHorasTrabalhadasSemana() {
    this.registroPontoService.getHorasTrabalhadasSemana(this.funcionarioId).subscribe(
      res => this.horasTrabalhadasSemana = res,
      err => console.error('Erro ao buscar horas trabalhadas na semana', err)
    );
  }

  loadFaltasSemana() {
    this.registroPontoService.getFaltasSemana(this.funcionarioId).subscribe(
      res => this.faltasSemana = res,
      err => console.error('Erro ao buscar faltas na semana', err)
    );
  }

  loadPontosSemana() {
    this.registroPontoService.getPontosSemana(this.funcionarioId).subscribe(
      res => this.pontosSemana = res,
      err => console.error('Erro ao buscar pontos da semana', err)
    );
  }

  loadHorasPorDiaSemana() {
    this.registroPontoService.getHorasPorDiaSemana(this.funcionarioId).subscribe(
      res => this.horasPorDiaSemana = res,
      err => console.error('Erro ao buscar horas por dia da semana', err)
    );
  }

  loadResumoMensal() {
    const ano = 2025;
    const mes = 6;
    this.registroPontoService.getResumoMensal(ano, mes, this.funcionarioId).subscribe(
      res => this.resumoMensal = res,
      err => console.error('Erro ao buscar resumo mensal', err)
    );
  }

  // ADM Service
  criarAdmin() {
    this.administradoresService.criarAdministrador(this.usuario, this.senha).subscribe({
      next: (res) => {
        this.mensagem = 'Administrador criado com sucesso!';
      },
      error: (err) => {
        this.mensagem = 'Erro ao criar administrador: ' + err.message;
      }
    });
  }

  loginAdmin() {
    this.administradoresService.login(this.usuario, this.senha).subscribe({
      next: (res) => {
        this.mensagem = 'Login realizado com sucesso!';
      },
      error: (err) => {
        this.mensagem = 'Erro no login: ' + err.message;
      }
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
