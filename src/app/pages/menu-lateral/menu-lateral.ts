import { Component, OnInit } from '@angular/core';
import { Funcionarios } from '../../services/funcionarios/funcionarios';
import { Router } from '@angular/router';
import { Biometria, BiometriaRequest } from '../../services/biometria/biometria';
import Swal from 'sweetalert2';
import { Administradores } from '../../services/administradores/administradores';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu-lateral',
  standalone: false,
  templateUrl: './menu-lateral.html',
  styleUrl: './menu-lateral.css'
})

export class MenuLateral implements OnInit {
  funcionarios: any[] = [];
  mensagem: string = '';
  formFuncionario: FormGroup;

  constructor(
    private router: Router,
    private funcionarioService: Funcionarios,
    private biometriaService: Biometria,
    private administradores: Administradores,
    private fb: FormBuilder,
  ) {
    this.formFuncionario = this.fb.group({
      nome: ['', Validators.required],
      cargo: ['', Validators.required],
      urlFoto: ['', Validators.required],
      status: ['ATIVO', Validators.required],
      setor: this.fb.group({
        id: [null, Validators.required],
        name: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.funcionarioService.getListaFuncionarios().subscribe(data => {
      this.funcionarios = data;
    });
  }

  irParaColaborador(id: number) {
    this.router.navigate(['/colaboradores', id]);
  }

  cadastrarBiometria() {
    Swal.fire({
      title: 'Cadastrar Biometria',
      html:
        `<input id="funcionario-id" type="number" class="swal2-input" placeholder="ID do Funcionário">` +
        `<input id="bio-template" type="text" class="swal2-input" placeholder="Posição Biométrica">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Cadastrar',
      preConfirm: () => {
        const funcionarioId = Number((document.getElementById('funcionario-id') as HTMLInputElement).value);
        const bioTemplate = (document.getElementById('bio-template') as HTMLInputElement).value;

        if (!funcionarioId || !bioTemplate) {
          Swal.showValidationMessage('Todos os campos são obrigatórios!');
          return null;
        }

        return { funcionarioId, bioTemplate };
      }
    }).then(result => {
      if (result.isConfirmed && result.value) {
        const { funcionarioId, bioTemplate } = result.value;

        Swal.fire({
          title: 'Posicione o dedo no leitor...',
          text: 'Aguardando leitura biométrica.',
          icon: 'info',
          showConfirmButton: false,
          timer: 2000
        });

        const dados: BiometriaRequest = {
          funcionarioId,
          bioTemplate
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

  abrirModalCadastro() {
    Swal.fire({
      title: 'Adicionar Funcionário',
      html: `
      <form id="formFuncionario">
        <input id="nome" placeholder="Nome" class="swal2-input">
        <input id="cargo" placeholder="Cargo" class="swal2-input">
        <input id="urlFoto" placeholder="URL da Foto" class="swal2-input">
        <input id="setorId" placeholder="ID do Setor" type="number" class="swal2-input">
      </form>
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Cadastrar',
      preConfirm: () => {
        const nome = (document.getElementById('nome') as HTMLInputElement).value;
        const cargo = (document.getElementById('cargo') as HTMLInputElement).value;
        const urlFoto = (document.getElementById('urlFoto') as HTMLInputElement).value;
        const setorId = (document.getElementById('setorId') as HTMLInputElement).value;

        if (!nome || !cargo || !urlFoto || !setorId) {
          Swal.showValidationMessage('Todos os campos são obrigatórios');
          return false;
        }

        return {
          nome,
          cargo,
          urlFoto,
          setorId
        };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.cadastrarFuncionario(result.value);
      }
    });
  }

  cadastrarFuncionario(funcionario: any) {
    this.funcionarioService.adicionarFuncionario(funcionario).subscribe({
      next: () => {
        Swal.fire('Sucesso!', 'Funcionário cadastrado com sucesso!', 'success');
      },
      error: () => {
        Swal.fire('Erro!', 'Não foi possível cadastrar o funcionário.', 'error');
      }
    });
  }

  paginaAdm() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    Swal.fire({
      title: 'Tem certeza que deseja sair?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, sair',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      }
    });
  }

}
