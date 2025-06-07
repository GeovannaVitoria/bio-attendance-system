import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface Funcionario {
  id: number;
  nome: string;
  cargo: string;
  urlFoto: string;
  setor: {
    id: number;
    name: string;
  },
  status: string;
}

@Injectable({
  providedIn: 'root'
})

export class Funcionarios {

  constructor(private httpClient: HttpClient) { }

  private url = environment.urlFuncionario;
  private urlLista = environment.urlListaDadosFuncionario;

  getQuantidadeColaboradoresAtivos(): Observable<number> {
    return this.httpClient.get<number>(`${this.url}/ativos`);
  }

  // getListaFuncionarios(): Observable<Funcionario[]> {
  //   return this.httpClient.get<Funcionario[]>(this.urlLista);
  // }

  getListaFuncionarios(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.urlLista}`);
  }


  getFuncionarioDetalhado(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.urlLista}/${id}`);
  }


}
