import { Component, OnInit } from '@angular/core';
import { Funcionarios } from '../../services/funcionarios/funcionarios';
import { Router } from '@angular/router';
import { Biometria, BiometriaRequest } from '../../services/biometria/biometria';
import Swal from 'sweetalert2';
import { Administradores } from '../../services/administradores/administradores';

@Component({
  selector: 'app-menu-lateral',
  // imports: [],
  standalone: false,
  templateUrl: './menu-lateral.html',
  styleUrl: './menu-lateral.css'
})
export class MenuLateral implements OnInit {
  funcionarios: any[] = [];
  mensagem: string = '';

  constructor(
    private router: Router,
    private funcionarioService: Funcionarios,
    private biometriaService: Biometria,
    private administradores: Administradores
  ) { }
  ngOnInit(): void {

    this.funcionarioService.getListaFuncionarios().subscribe(data => {
      this.funcionarios = data;
    });
  }

  irParaColaborador(id: number) {
    this.router.navigate(['/colaboradores', id]);
  }

  // cadastrarBiometria() {
  //   this.mensagem = 'Posicione o dedo no leitor...';

  //   const dados: BiometriaRequest = {
  //     bioTemplate: 'Posição no leitor',
  //     funcionarioId: 2
  //   };

  //   this.biometriaService.adicionarBiometria(dados).subscribe({
  //     next: (res) => {
  //       this.mensagem = 'Biometria cadastrada com sucesso!';
  //     },
  //     error: (err) => {
  //       this.mensagem = 'Erro ao cadastrar biometria';
  //       console.error(err);
  //     }
  //   });
  // }

  cadastrarBiometria() {
    Swal.fire({
      title: 'Posicione o dedo no leitor...',
      text: 'Aguardando leitura biométrica.',
      icon: 'info',
      showConfirmButton: false,
      timer: 2000
    });

    const dados: BiometriaRequest = {
      bioTemplate: 'Posição no leitor',
      funcionarioId: 2
    };

    this.biometriaService.adicionarBiometria(dados).subscribe({
      next: () => {
        Swal.fire({
          title: 'Biometria cadastrada!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error: () => {
        Swal.fire({
          title: 'Erro!',
          text: 'Falha ao cadastrar biometria.',
          icon: 'error',
          confirmButtonText: 'Tentar novamente',
          confirmButtonColor: '#8FB78F'
        });
      }
    });
  }

  modalCriarAdmin() {
    Swal.fire({
      title: 'Criar Administrador',
      html:
        `<input type="text" id="usuario" class="swal2-input" placeholder="Usuário">` +
        `<input type="password" id="senha" class="swal2-input" placeholder="Senha">`,
      confirmButtonText: 'Criar',
      focusConfirm: false,
      preConfirm: () => {
        const usuario = (document.getElementById('usuario') as HTMLInputElement).value;
        const senha = (document.getElementById('senha') as HTMLInputElement).value;
        if (!usuario || !senha) {
          Swal.showValidationMessage('Preencha todos os campos');
          return;
        }
        return { usuario, senha };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.administradores.criarAdministrador(result.value.usuario, result.value.senha)
          .subscribe({
            next: () => Swal.fire('Sucesso!', 'Administrador criado com sucesso.', 'success'),
            error: () => Swal.fire('Erro', 'Falha ao criar administrador.', 'error')
          });
      }
    });
  }


  paginaAdm() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.router.navigate(['/login']);
  }

}
