import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

export interface BiometriaRequest {
  bioTemplate: string;
  funcionarioId: number;
}

@Injectable({
  providedIn: 'root'
})

export class Biometria {

  constructor(private httpClient: HttpClient) { }

  private url = environment.urlBiometria;

  adicionarBiometria(biometria: BiometriaRequest): Observable<any> {
    return this.httpClient.post(this.url, biometria);
  }

}
