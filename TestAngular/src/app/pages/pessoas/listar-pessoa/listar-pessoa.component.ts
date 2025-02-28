import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  formFiltro: FormGroup = new FormGroup({
    nome: new FormControl(''),
    cidade: new FormControl('')
  });

  constructor(
    private readonly pessoaService: PessoaService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.carregarPessoas();
  }

  carregarPessoas() {
    this.pessoaService.listarPessoas().subscribe({
      next: (dados: IPessoa[]) => {
        this.pessoas = dados;
      },
      error: (erro: any) => {
        console.error('Erro ao carregar pessoas:', erro);
      }
    });
  }

  filtrarPessoas() {
    const { nome, cidade } = this.formFiltro.value;
    this.pessoaService.listarPessoas().subscribe({
      next: (dados) => {
        this.pessoas = dados.filter(pessoa =>
          (nome ? pessoa.nome.toLowerCase().includes(nome.toLowerCase()) : true) &&
          (cidade ? pessoa.cidade.toLowerCase().includes(cidade.toLowerCase()) : true)
        );
      },
      error: (erro) => {
        console.error('Erro ao filtrar pessoas:', erro);
      }
    });
  }

}
