import { Component, OnInit } from '@angular/core';
import { PessoaService } from 'src/app/service/pessoa.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPessoa } from 'src/app/interfaces/pessoa';
import { ViaCepService } from 'src/app/service/viacep.service';
import { Endereco } from 'src/app/interfaces/endereco';



@Component({
  selector: 'app-cadastrar-pessoa',
  templateUrl: './cadastrar-pessoa.component.html',
  styleUrls: ['./cadastrar-pessoa.component.scss']
})
export class CadastrarPessoaComponent implements OnInit {

  id: string = '';
  FormGroupPessoa: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    cep: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}-[0-9]{3}$')]), // Validação para o formato do CEP
    logradouro: new FormControl('', [Validators.required]),
    bairro: new FormControl('', [Validators.required]),
    cidade: new FormControl('', [Validators.required]),
    uf: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pessoaService: PessoaService,
    private readonly router: Router,
    private readonly viaCepService: ViaCepService,
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
        alert('Pessoa cadastrada com sucesso!');
        this.router.navigate(['/pessoas']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar pessoa:', err);
        alert('Erro ao cadastrar pessoa. Verifique os dados e tente novamente.');
      }
    });
  }


  buscarEndereco() {
    const cep = this.FormGroupPessoa.get('cep')?.value;
    if (cep && cep.length === 9) {
      this.viaCepService.buscarEnderecoPorCep(cep).subscribe({
        next: (endereco: Endereco) => {
          if (endereco?.logradouro && endereco?.bairro && endereco?.localidade && endereco?.uf) {
            this.FormGroupPessoa.patchValue({
              logradouro: endereco.logradouro,
              bairro: endereco.bairro,
              cidade: endereco.localidade,
              uf: endereco.uf,
            });
          } else {
            alert('Dados do endereço não encontrados.');
          }
        },
      });
    }
  }

  limparFormulario() {
    this.FormGroupPessoa.reset();
  }
}


