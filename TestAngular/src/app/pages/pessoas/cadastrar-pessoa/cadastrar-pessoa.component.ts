import { Component, OnInit } from '@angular/core';
import { PessoaService } from 'src/app/service/pessoa.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPessoa } from 'src/app/interfaces/pessoa';

@Component({
  selector: 'app-cadastrar-pessoa',
  templateUrl: './cadastrar-pessoa.component.html',
  styleUrls: ['./cadastrar-pessoa.component.scss']
})
export class CadastrarPessoaComponent{


  id: string = '';
  FormGroupPessoa: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    cep: new FormControl('', [Validators.required]),
    logradouro: new FormControl('', [Validators.required]),
    bairro: new FormControl('', [Validators.required]),
    cidade: new FormControl('', [Validators.required]),
    uf: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pessoaService: PessoaService,
    private readonly router: Router,
  ) { }


  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.pessoaService.buscarPessoaPorId(this.id).subscribe(response => {
        console.log(response);
      })
    }
  }

  cadastrarPessoa() {
    const pessoa: IPessoa = this.FormGroupPessoa.value;

    this.pessoaService.cadastrarPessoa(pessoa).subscribe({
      next: (response) => {
        console.log('Pessoa cadastrada com sucesso:', response);
        alert('Pessoa cadastrada com sucesso!'); // Apenas para feedback visual rápido
        this.router.navigate(['/pessoas']); // Redireciona para a lista de pessoas
      },
      error: (err) => {
        console.error('Erro ao cadastrar pessoa:', err);
        alert('Erro ao cadastrar pessoa. Verifique os dados e tente novamente.');
      }
    });
  }
}
