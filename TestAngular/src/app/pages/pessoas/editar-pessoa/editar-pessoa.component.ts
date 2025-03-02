import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PessoaService } from 'src/app/service/pessoa.service';
import { ViaCepService } from 'src/app/service/viacep.service';
import { IPessoa } from 'src/app/interfaces/pessoa';
import { Endereco } from 'src/app/interfaces/endereco';
@Component({
  selector: 'app-editar-pessoa',
  templateUrl: './editar-pessoa.component.html',
  styleUrls: ['./editar-pessoa.component.scss']
})
export class EditarPessoaComponent {

  formGroupPessoa: FormGroup;
  pessoaEncontrada: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly pessoaService: PessoaService,
    private readonly viaCepService: ViaCepService
  ) {
    this.formGroupPessoa = this.fb.group({
      id: [''],
      nome: ['', [
        Validators.required,
        Validators.pattern('^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$'),
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      cep: ['', [Validators.required, Validators.pattern('^[0-9]{5}-[0-9]{3}$')]],
      logradouro: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required]
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
          console.error(error);
          alert('ID Inválido');
          this.pessoaEncontrada = false;
        }
      );
    }
  }

  editarPessoa(): void {
    const id = this.formGroupPessoa.get('id')?.value;
    const pessoa: IPessoa = this.formGroupPessoa.value;

    if (this.formGroupPessoa.valid) {
      this.pessoaService.editarPessoa(id, pessoa).subscribe(
        (pessoaAtualizada: IPessoa) => {
          console.log(pessoaAtualizada);
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
