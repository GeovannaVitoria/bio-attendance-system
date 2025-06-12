import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import Swal from 'sweetalert2';
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

  // adicionarBiometria(dados: BiometriaRequest) {
  //   return this.httpClient.post(this.url, dados);
  // }

  adicionarBiometria(biometria: BiometriaRequest): Observable<any> {
    return this.httpClient.post(this.url, biometria);
  }

  // adicionarBiometria() {
  //   Swal.fire({
  //     title: 'Aguardando...',
  //     text: 'Posicione o dedo no leitor',
  //     icon: 'info',
  //     allowOutsideClick: false,
  //     showConfirmButton: false
  //   });

  //   // Espera 3 segundos (3000 ms) antes de enviar a biometria
  //   setTimeout(() => {
  //     const payload = {
  //       bioTemplate: 'Posição no leitor',  // Troque isso pelo dado real do leitor
  //       funcionarioId: 2
  //     };

  //     this.httpClient.post(`${this.url}/bioapi/biometria`, payload).subscribe({
  //       next: () => {
  //         Swal.fire({
  //           title: 'Sucesso!',
  //           text: 'Biometria cadastrada com sucesso.',
  //           icon: 'success',
  //           confirmButtonText: 'OK'
  //         });
  //       },
  //       error: (err) => {
  //         Swal.fire({
  //           title: 'Erro',
  //           text: 'Não foi possível cadastrar a biometria.',
  //           icon: 'error',
  //           confirmButtonText: 'OK'
  //         });
  //         console.error(err);
  //       }
  //     });
  //   }, 3000); // 3 segundos
  // }


}
