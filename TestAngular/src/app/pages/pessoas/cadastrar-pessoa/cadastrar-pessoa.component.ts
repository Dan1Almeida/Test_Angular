import { Component } from '@angular/core';
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
export class CadastrarPessoaComponent {

  id: string = '';
  FormGroupPessoa: FormGroup = new FormGroup({
    nome: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$'), Validators.minLength(3), Validators.maxLength(100)]),
    cep: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}-[0-9]{3}$') ]),
    logradouro: new FormControl('', [Validators.required]),
    bairro: new FormControl('', [Validators.required]),
    cidade: new FormControl('', [Validators.required]),
    uf: new FormControl('', [Validators.required])
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pessoaService: PessoaService,
    private readonly router: Router,
    private readonly viaCepService: ViaCepService,
  ) { }



  cadastrarPessoa() {
    const pessoa: IPessoa = this.FormGroupPessoa.value;

    this.pessoaService.cadastrarPessoa(pessoa).subscribe(response => {
      console.log(response);
      alert('Pessoa cadastrada com sucesso!');
      this.router.navigate(['']);
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
            alert('Endereço não encontrados no VIACEP.');
          }
        },
      });
    }
  }

  limparFormulario() {
    this.FormGroupPessoa.reset();
  }
}


