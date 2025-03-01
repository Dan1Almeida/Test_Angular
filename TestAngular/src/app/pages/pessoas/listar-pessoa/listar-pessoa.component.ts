import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IPessoa } from 'src/app/interfaces/pessoa';
import { PessoaService } from 'src/app/service/pessoa.service';

@Component({
  selector: 'app-listar-pessoa',
  templateUrl: './listar-pessoa.component.html',
  styleUrls: ['./listar-pessoa.component.scss']
})
export class ListarPessoaComponent implements OnInit{
  pessoas: IPessoa[] = [];
  pessoasComCelular: IPessoa[] = [];
  formFiltro: FormGroup;

  constructor(private pessoaService: PessoaService, private fb: FormBuilder) {
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

  obterCelular(pessoa: IPessoa): string {
    const contatoComCelular = pessoa.contatos.find(contato => contato.celular);
    return contatoComCelular ? contatoComCelular.celular : 'Não informado';
  }

  editarPessoa(id: number): void {
    console.log(`Editar pessoa com ID: ${id}`);
  }


  }


