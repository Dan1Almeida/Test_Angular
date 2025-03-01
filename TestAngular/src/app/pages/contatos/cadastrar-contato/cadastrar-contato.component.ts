import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPessoa } from 'src/app/interfaces/pessoa';
import { PessoaService } from 'src/app/service/pessoa.service';
import { ContatoService } from 'src/app/service/contato.service';


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
      celular: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      tipo: [''],
      contato: [''],
    });
  }

  buscarPessoa(): void {
    const id = this.formGroupPessoa.get('id')?.value;

    if (id) {
      this.pessoaService.buscarPessoaPorId(id).subscribe(
        (pessoa: IPessoa) => {
          this.formGroupPessoa.patchValue(pessoa);
          this.pessoaEncontrada = true;
        },
        (error) => {
          console.error('Erro ao buscar pessoa:', error);
          alert('Pessoa não encontrada!');
          this.pessoaEncontrada = false;
        }
      );
    } else {
      alert('Informe um ID válido.');
    }
  }


  cadastrarContato(): void {
    const pessoaId = this.formGroupPessoa.get('id')?.value;

    if (!pessoaId) {
      alert('Informe um ID de pessoa válido!');
      return;
    }

    if (this.formGroupContato.valid) {
      this.contatoService.cadastrarContato(pessoaId, this.formGroupContato.value).subscribe(
        () => {
          alert('Contato cadastrado com sucesso!');
          this.formGroupContato.reset();
        },
        (error) => {
          console.error('Erro ao cadastrar contato:', error);
          alert('Erro ao cadastrar contato.');
        }
      );
    } else {
      alert('Preencha os campos obrigatórios.');
    }
}
}
