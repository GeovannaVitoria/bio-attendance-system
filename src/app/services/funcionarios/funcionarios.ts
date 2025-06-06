import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Funcionarios {

  constructor(private httpClient: HttpClient) { }

  private url = environment.urlFuncionario;

  getQuantidadeColaboradoresAtivos(): Observable<number> {
    return this.httpClient.get<number>(`${this.url}/ativos`);
  }


}
