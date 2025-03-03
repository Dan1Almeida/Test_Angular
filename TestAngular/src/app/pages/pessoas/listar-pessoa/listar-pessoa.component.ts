import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IPessoa } from 'src/app/interfaces/pessoa';
import { PessoaService } from 'src/app/service/pessoa.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-pessoa',
  templateUrl: './listar-pessoa.component.html',
  styleUrls: ['./listar-pessoa.component.scss']
})
export class ListarPessoaComponent implements OnInit{
  pessoas: IPessoa[] = [];
  pessoasComCelular: IPessoa[] = [];
  formFiltro: FormGroup;

  constructor(
    private readonly pessoaService: PessoaService,
    private readonly fb: FormBuilder,
    private readonly router: Router) {
    this.formFiltro = this.fb.group({
      nome: [''],
      cidade: ['']
    });
  }

  ngOnInit(): void {
    this.pessoaService.listarPessoas().subscribe((pessoas: IPessoa[]) => {
      this.pessoas = pessoas;
      this.filtrarPessoas();
    });
  }

  filtrarPessoas(): void {
    const { nome, cidade } = this.formFiltro.value;
    this.pessoasComCelular = this.pessoas.filter(pessoa => {
      return (
        (!nome || pessoa.nome.includes(nome)) &&
        (!cidade || pessoa.cidade.includes(cidade)) &&
        pessoa.contatos.some(contato => contato.celular)
      );
    });
  }

  editarPessoa(id: number): void {
    this.router.navigate(['pessoas/editar']);
  }

  deletarPessoa(id: number): void {
    Swal.fire({
      title: 'Confirmar exclusão de pessoa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pessoaService.deletarPessoa(id).subscribe({
          next: () => {
            this.pessoas = this.pessoas.filter(pessoa => pessoa.id !== id);
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "Pessoa deletada com sucesso"
            });
            this.router.navigate(['']);
          },
        });
      }
    });
  }
}

