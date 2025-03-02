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
      celular: ['', [Validators.pattern(/^\d{11}$/)]],
      tipo: [''],
      contato: [''],
    });
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
          alert('ID Inválido');
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

