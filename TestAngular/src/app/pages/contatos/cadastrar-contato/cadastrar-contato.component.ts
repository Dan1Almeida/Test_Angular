import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPessoa } from 'src/app/interfaces/pessoa';
import { PessoaService } from 'src/app/service/pessoa.service';
import { ContatoService } from 'src/app/service/contato.service';
import { IContato } from 'src/app/interfaces/contato';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cadastrar-contato',
  templateUrl: './cadastrar-contato.component.html',
  styleUrls: ['./cadastrar-contato.component.scss']
})
export class CadastrarContatoComponent {
  FormGroupPessoa: FormGroup;
  FormGroupContato: FormGroup;
  pessoaEncontrada: boolean = false;
  contatos: IContato[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly pessoaService: PessoaService,
    private readonly contatoService: ContatoService,
    private readonly router: Router,
  ) {

    this.FormGroupPessoa = this.fb.group({
      id: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]],
      nome: [''],
    });

    this.FormGroupContato = this.fb.group({
      celular: ['', [Validators.pattern(/^\(\d{2}\) 9\d{4}-\d{4}$/)]],
      tipo: [''],
      contato: [''],
    });

    this.FormGroupContato.get('tipo')?.valueChanges.subscribe((tipoSelecionado) => {
      const contatoControl = this.FormGroupContato.get('contato');

      if (contatoControl) {
        contatoControl.clearValidators();

        switch (tipoSelecionado) {
          case 'residencial':
            contatoControl.setValidators([Validators.pattern(/^\(\d{2}\) \d{4}-\d{4}$/)]);
            break
          case 'profissional':
            contatoControl.setValidators([Validators.pattern(/^\(\d{2}\) 9\d{4}-\d{4}$/)]);
            break;
          case 'email':
            contatoControl.setValidators([Validators.email]);
            break;
          case 'social':
            contatoControl.setValidators([Validators.pattern(/^@[a-zA-Z0-9_.]+$/)]);
            break;
        }

        contatoControl.updateValueAndValidity();
      }
    });

  }

  tiposContato = [
    { label: 'Telefone Residencial', value: 'residencial' },
    { label: 'Telefone Profissional', value: 'profissional' },
    { label: 'E-mail', value: 'email' },
    { label: 'Social', value: 'social' },
  ];

  getPlaceholder(): string {
    const tipo = this.FormGroupContato.get('tipo')?.value;
    switch (tipo) {
      case 'residencial': return 'Exemplo: (01) 0101-0101';
      case 'profissional': return 'Exemplo: (01) 90101-0101';
      case 'email': return 'Exemplo: teste@teste.com';
      case 'social': return 'Exemplo: Teste@Teste.com';
      default: return 'Contato';
    }
  }


  buscarPessoa(): void {
    const id = this.FormGroupPessoa.get('id')?.value;

    if (id) {
      this.pessoaService.buscarPessoaPorId(id).subscribe({
        next: (pessoa: IPessoa) => {
          this.FormGroupPessoa.patchValue(pessoa);
          this.pessoaEncontrada = true;
        },
        error: (error) => {
          console.error(error);
          alert('Pessoa não Encontrada');
          this.pessoaEncontrada = false;
        }
      });
    }
  }


  cadastrarContato(): void {
    const pessoaId = this.FormGroupPessoa.get('id')?.value;

    if (this.FormGroupContato.valid) {
      this.contatoService.cadastrarContato(pessoaId, this.FormGroupContato.value).subscribe(response =>{
        console.log(response);
        alert('Contato cadastrado com sucesso!');
        this.FormGroupContato.reset();
        this.router.navigate(['']);
      });
    } else {
      alert('Erro ao cadastrar contato.');
    }
  }

  limparFormularioPessoa() {
    this.FormGroupPessoa.reset();

  }

  limparFormularioContato() {
    this.FormGroupContato.reset();
  }

}

