import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionarios } from '../../services/funcionarios/funcionarios';
import { RegistroPonto } from '../../services/registro-ponto/registro-ponto';
import { switchMap, tap } from 'rxjs';
import ExcelJS from 'exceljs';

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
  barChartData: any;
  barChartOptions: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private funcionarioService: Funcionarios,
    private registroPontoService: RegistroPonto,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      // Extrai o ID da rota
      switchMap(paramMap => {
        const id = Number(paramMap.get('id'));
        if (!id) throw new Error('ID inválido');

        // Atualiza dados do funcionário
        return this.funcionarioService.getFuncionarioDetalhado(id).pipe(
          tap(funcionario => this.funcionario = funcionario),

          // Chama os outros métodos que não retornam observables
          tap(() => {
            this.loadSaldoHoras(id);
            this.loadHorasTrabalhadasSemana(id);
            this.loadFaltasSemana(id);
            this.loadPontosSemana(id);
            this.loadHorasPorDiaSemana(id);
            this.loadResumoMensal(id);
          })
        );
      })
    ).subscribe({
      error: err => console.error('Erro ao carregar dados do colaborador', err)
    });
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
      (res: any) => {
        this.horasPorDiaSemana = res;

        // Converte para decimal para usar no gráfico
        const horasConvertidas = res.map((item: any) =>
          this.convertTimeStringToDecimal(item.qtdHoras)
        );

        // Armazena os valores originais (08:30:00, etc.)
        const valoresOriginais = res.map((item: any) => item.qtdHoras);

        this.barChartData = {
          labels: ['Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
          datasets: [
            {
              label: 'Horas trabalhadas',
              backgroundColor: '#8cc598',
              borderRadius: 5,
              barPercentage: 0.5,
              hoverBackgroundColor: '#b8ddc2',
              data: horasConvertidas
            }
          ]
        };

        this.barChartOptions = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function (context: any) {
                  const index = context.dataIndex;
                  const label = context.dataset.label || '';
                  const valorOriginal = valoresOriginais[index] || '00:00:00';
                  return `${label}: ${valorOriginal}`;
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        };
      },
      (err: any) => console.error('Erro ao buscar horas por dia da semana', err)
    );
  }


  convertTimeStringToDecimal(timeString: string): number {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours + minutes / 60;
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

  exportarResumoMensalParaExcel() {
  if (!this.resumoMensal || !this.resumoMensal.length) {
    console.warn('Não há dados para exportar.');
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Resumo Mensal');

  worksheet.columns = [
    { header: 'Data', key: 'data', width: 15 },
    { header: 'Horas Trabalhadas', key: 'horasTrabalhadas', width: 18 },
    { header: 'Pausa', key: 'pausa', width: 12 },
    { header: 'Retorno', key: 'retorno', width: 12 },
    { header: 'Entrada', key: 'entrada', width: 12 },
    { header: 'Saída', key: 'saida', width: 12 },
  ];

  this.resumoMensal.forEach((item: any) => {
    worksheet.addRow({
      data: item.data,
      horasTrabalhadas: item.horasTrabalhadas,
      pausa: item.pausa,
      retorno: item.retorno,
      entrada: item.entrada,
      saida: item.saida
    });
  });

  worksheet.getRow(1).font = { bold: true };

  // Gera o arquivo em buffer e cria um Blob para download
  workbook.xlsx.writeBuffer().then((buffer: BlobPart) => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);

    // Cria um link temporário
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resumo_mensal.xlsx';
    document.body.appendChild(a);
    a.click();

    // Remove o link e libera o objeto URL
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  });
}

}
