import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Administradores {

  constructor(private httpClient: HttpClient) { }

  private url = environment.urlAdministradores;

  criarAdministrador(usuario: string, senha: string): Observable<any> {
    const body = { usuario, senha };
    return this.httpClient.post<any>(`${this.url}`, body);
  }

  login(usuario: string, senha: string): Observable<any> {
    const body = { usuario, senha };
    return this.httpClient.post<any>(`${this.url}/login`, body);
  }

}
