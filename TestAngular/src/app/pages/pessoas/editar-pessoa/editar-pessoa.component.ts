import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PessoaService } from 'src/app/service/pessoa.service';
import { ViaCepService } from 'src/app/service/viacep.service';
import { IPessoa } from 'src/app/interfaces/pessoa';
import { Endereco } from 'src/app/interfaces/endereco';
import {Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-pessoa',
  templateUrl: './editar-pessoa.component.html',
  styleUrls: ['./editar-pessoa.component.scss']
})
export class EditarPessoaComponent {
  FormGroupBusca: FormGroup;
  FormGroupPessoa: FormGroup;
  pessoaEncontrada: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly pessoaService: PessoaService,
    private readonly viaCepService: ViaCepService,
    private readonly router: Router,
  ) {

    this.FormGroupBusca = this.fb.group({
      id: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]],
    })
    this.FormGroupPessoa = this.fb.group({
      id: [''],
      nome: ['', [Validators.required, Validators.pattern('^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$'),
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
    const id = this.FormGroupBusca.get('id')?.value;

    if (id) {
      this.pessoaService.buscarPessoaPorId(id).subscribe({
        next: (pessoa: IPessoa) => {
          this.FormGroupPessoa.patchValue(pessoa);
          this.pessoaEncontrada = true;
        },
        error: (error) => {
          console.error(error);
const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: "Pessoa não encontrada"
          });
          this.pessoaEncontrada = false;
        }
      });
    }
  }

  editarPessoa(): void {
    const id = this.FormGroupPessoa.get('id')?.value;
    const pessoa: IPessoa = this.FormGroupPessoa.value;

    if (this.FormGroupPessoa.valid && id) {
      this.pessoaService.editarPessoa(id, pessoa).subscribe(response => {
          console.log(response);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Pessoa atualizada com sucesso"
          });
          this.router.navigate(['']);
        });
    }
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
    this.FormGroupBusca.reset();
  }
}
