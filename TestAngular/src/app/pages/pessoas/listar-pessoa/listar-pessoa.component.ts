import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IPessoa } from 'src/app/interfaces/pessoa';
import { PessoaService } from 'src/app/service/pessoa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pessoa',
  templateUrl: './listar-pessoa.component.html',
  styleUrls: ['./listar-pessoa.component.scss']
})
export class ListarPessoaComponent implements OnInit{
    pessoas: IPessoa[] = [];
    pessoasComCelular: IPessoa[] = [];
    formFiltro: FormGroup;

    constructor(private pessoaService: PessoaService, private fb: FormBuilder, private router: Router) {
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
      if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
        this.pessoaService.deletarPessoa(id).subscribe(() => {
          this.pessoas = this.pessoas.filter(pessoa => pessoa.id !== id);
          alert('Pessoa excluída com sucesso!');
        });
      }
    }
  }
