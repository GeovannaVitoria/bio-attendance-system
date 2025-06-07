import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegistroPonto {

  constructor(private httpClient: HttpClient) { }

  private url = environment.urlRegistroPonto;

  getMediaHorasTrabalhadas(): Observable<string> {
    return this.httpClient.get(`${this.url}/media-horas`, { responseType: 'text' });
  }

  getQuantidadeAtrasos(): Observable<number> {
    return this.httpClient.get<number>(`${this.url}/atrasos`);
  }

  getRelacaoHorasExtras(): Observable<number> {
    return this.httpClient.get<number>(`${this.url}/top5-horas-extras`);
  }

  getRelatorioSaldoSemanal(): Observable<number> {
    return this.httpClient.get<number>(`${this.url}/relatorio-saldo-semanal`);
  }

  getSaldoHoras(idFuncionario: number): Observable<any> {
    return this.httpClient.get(`${this.url}/saldo-horas?funcionarioId=${idFuncionario}`, { responseType: 'text' });
  }

  getHorasTrabalhadasSemana(funcionarioId: number): Observable<any> {
    return this.httpClient.get(`${this.url}/horas-trabalhadas-semana/${funcionarioId}`, { responseType: 'text' });
  }

  getFaltasSemana(funcionarioId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/faltas-semana/${funcionarioId}`);
  }

  getPontosSemana(funcionarioId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/pontos-por-semana/${funcionarioId}`);
  }

  getHorasPorDiaSemana(funcionarioId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/horas-por-dia/${funcionarioId}`);
  }

  getResumoMensal(ano: number, mes: number, funcionarioId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/resumo`, {
      params: {
        ano: ano.toString(),
        mes: mes.toString(),
        funcionarioId: funcionarioId.toString()
      }
    });
  }

}
