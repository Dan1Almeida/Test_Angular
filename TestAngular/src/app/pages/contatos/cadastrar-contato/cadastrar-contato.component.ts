import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPessoa } from 'src/app/interfaces/pessoa';
import { PessoaService } from 'src/app/service/pessoa.service';

@Component({
  selector: 'app-cadastrar-contato',
  templateUrl: './cadastrar-contato.component.html',
  styleUrls: ['./cadastrar-contato.component.scss']
})
export class CadastrarContatoComponent {

  formGroupPessoa: FormGroup;

  constructor(
      private readonly fb: FormBuilder,
      private readonly pessoaService: PessoaService,
    ) {
      this.formGroupPessoa = this.fb.group({
        id: [''],
        nome: ['', Validators.required],
      });
    }

   buscarPessoa(): void {
      const id = this.formGroupPessoa.get('id')?.value;

      if (id) {
        this.pessoaService.buscarPessoaPorId(id).subscribe(
          (pessoa: IPessoa) => {
            this.formGroupPessoa.patchValue(pessoa);
          },
          (error) => {
            console.error('Erro ao buscar pessoa:', error);
            alert('Pessoa não encontrada!');
          }
        );
      } else {
        alert('Informe um ID válido.');
      }
    }
}
