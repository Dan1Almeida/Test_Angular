import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PessoaService } from 'src/app/service/pessoa.service';
import { ViaCepService } from 'src/app/service/viacep.service';  // Importando o serviço ViaCep
import { IPessoa } from 'src/app/interfaces/pessoa';
import { Endereco } from 'src/app/interfaces/endereco';  // Definindo o tipo Endereco

@Component({
  selector: 'app-editar-pessoa',
  templateUrl: './editar-pessoa.component.html',
  styleUrls: ['./editar-pessoa.component.scss']
})
export class EditarPessoaComponent {

  formGroupPessoa: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly pessoaService: PessoaService,
    private readonly viaCepService: ViaCepService
  ) {
    this.formGroupPessoa = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      cep: ['', [Validators.required, Validators.pattern('^[0-9]{5}-[0-9]{3}$')]],
      logradouro: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
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

  editarPessoa(): void {
    const id = this.formGroupPessoa.get('id')?.value;
    const pessoa: IPessoa = this.formGroupPessoa.value;

    if (this.formGroupPessoa.valid) {
      this.pessoaService.editarPessoa(id, pessoa).subscribe(
        (pessoaAtualizada: IPessoa) => {
          console.log('Pessoa atualizada com sucesso:', pessoaAtualizada);
          alert('Cadastro atualizado com sucesso!');
        },
        (error) => {
          console.error('Erro ao atualizar pessoa:', error);
          alert('Erro ao atualizar pessoa. Tente novamente.');
        }
      );
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  buscarEndereco() {
    const cep = this.formGroupPessoa.get('cep')?.value;
    if (cep && cep.length === 9) {
      this.viaCepService.buscarEnderecoPorCep(cep).subscribe({
        next: (endereco: Endereco) => {
          if (endereco?.logradouro && endereco?.bairro && endereco?.localidade && endereco?.uf) {
            this.formGroupPessoa.patchValue({
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


}
