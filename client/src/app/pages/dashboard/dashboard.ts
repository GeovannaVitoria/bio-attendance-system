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
  usuario: string = '';
  senha: string = '';
  mensagem: string = '';
  funcionarios: any[] = [];
  doughnutData: any;
  doughnutOptions: any;

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
    this.funcionarioService.getListaFuncionarios().subscribe(data => {
      this.funcionarios = data;
    });
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
      resposta => {

        this.relatorioSaldoMensal = resposta;
        this.doughnutData = {
          labels: ['Positivo', 'Negativo', 'Zerado'],
          datasets: [
            {
              data: [this.relatorioSaldoMensal.quantidadeSaldoPositivo, this.relatorioSaldoMensal.quantidadeSaldoNegativo, this.relatorioSaldoMensal.quantidadeSaldoZerado,],
              backgroundColor: ['#54C354', '#A02724', 'rgba(0, 0, 0, 0.7)'],
              hoverBackgroundColor: ['#54C354', '#A02724', 'rgba(0, 0, 0, 0.7)']
            }
          ]
        };

        this.doughnutOptions = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          }
        };


      },
      erro => console.error('Erro ao buscar relatório de saldos', erro)
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

  // loadListaFuncionarios() {
  //   this.funcionarioService.getListaFuncionarios().subscribe({
  //     next: (res) => {
  //       this.listaFuncionarios = res;
  //     },
  //     error: (err) => {
  //       console.error('Erro ao buscar funcionários:', err);
  //     }
  //   });
  // }


  // trocarFuncionario(id: number) {
  //   this.funcionarioId = id;
  //   this.router.navigate(['/colaboradores'], { queryParams: { id: id } });
  // }


  irParaColaborador(id: number) {
    this.router.navigate(['/colaboradores', id]);
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