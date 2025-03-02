import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPessoa } from 'src/app/interfaces/pessoa';
import { PessoaService } from 'src/app/service/pessoa.service';
import { ContatoService } from 'src/app/service/contato.service';
import { IContato } from 'src/app/interfaces/contato';


@Component({
  selector: 'app-cadastrar-contato',
  templateUrl: './cadastrar-contato.component.html',
  styleUrls: ['./cadastrar-contato.component.scss']
})
export class CadastrarContatoComponent {
  formGroupPessoa: FormGroup;
  formGroupContato: FormGroup;
  pessoaEncontrada: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly pessoaService: PessoaService,
    private readonly contatoService: ContatoService
  ) {

    this.formGroupPessoa = this.fb.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
    });

    this.formGroupContato = this.fb.group({
      celular: ['', [Validators.pattern(/^\(\d{2}\) 9\d{4}-\d{4}$/)]],
      tipo: [''],
      contato: [''],
    });

    this.formGroupContato.get('tipo')?.valueChanges.subscribe((tipoSelecionado) => {
      const contatoControl = this.formGroupContato.get('contato');

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
    { label: 'Telefone Profisional', value: 'profisional' },
    { label: 'E-mail', value: 'email' },
    { label: 'Social', value: 'social' },
  ];

  getPlaceholder(): string {
    const tipo = this.formGroupContato.get('tipo')?.value;
    switch (tipo) {
      case 'residencial': return 'Exemplo: (01) 0101-0101';
      case 'profisional': return 'Exemplo: (01) 90101-0101';
      case 'email': return 'Exemplo: teste@teste.com';
      case 'social': return 'Exemplo: Teste@Teste.com';
      default: return 'Contato';
    }
  }

  contatos: IContato[] = [];

  buscarPessoa(): void {
    const id = this.formGroupPessoa.get('id')?.value;

    if (id) {
      this.pessoaService.buscarPessoaPorId(id).subscribe(
        (pessoa: IPessoa) => {
          this.formGroupPessoa.patchValue(pessoa);
          this.pessoaEncontrada = true;
        },
        (error) => {
          console.error(error);
          alert('ID Inválido | Pessoa não Encontrada');
          this.pessoaEncontrada = false;
        }
      );
    }
  }


  cadastrarContato(): void {
    const pessoaId = this.formGroupPessoa.get('id')?.value;

    if (this.formGroupContato.valid) {
      this.contatoService.cadastrarContato(pessoaId, this.formGroupContato.value).subscribe(
        () => {
          alert('Contato cadastrado com sucesso!');
          this.formGroupContato.reset();
        }
      );
    } else {
      alert('Erro ao cadastrar contato.');
    }
  }


}

