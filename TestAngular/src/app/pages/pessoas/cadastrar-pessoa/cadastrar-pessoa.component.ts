import { Component } from '@angular/core';
import { ViaCepService } from 'src/app/service/viacep.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-pessoa',
  templateUrl: './cadastrar-pessoa.component.html',
  styleUrls: ['./cadastrar-pessoa.component.scss']
})
export class CadastrarPessoaComponent {
  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder, private viaCepService: ViaCepService) {
    // Inicializando o formulário
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required]],
      cep: ['', [Validators.required, Validators.pattern('[0-9]{5}-[0-9]{3}')]],
      logradouro: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
    });
  }

  // Método para preencher o endereço automaticamente com o ViaCEP
  buscarEndereco() {
    const cep = this.cadastroForm.get('cep')?.value;
    if (cep && cep.length === 9) {
      this.viaCepService.buscarEnderecoPorCep(cep).subscribe({
        next: (endereco) => {
          this.cadastroForm.patchValue({
            logradouro: endereco.logradouro,
            bairro: endereco.bairro,
            cidade: endereco.localidade,
            uf: endereco.uf,
          });
        },
        error: (err) => {
          console.error('Erro ao buscar endereço:', err);
        },
      });
    }
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      console.log(this.cadastroForm.value);
      // Aqui você pode enviar os dados para o backend ou realizar outra ação
    }
  }
}
