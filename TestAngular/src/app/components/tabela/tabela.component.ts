import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IPessoa } from 'src/app/interfaces/pessoa';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent {
  @Input() pessoas: IPessoa[] = [];
  @Output() editar = new EventEmitter<number>();
  @Output() deletar = new EventEmitter<number>();

  obterCelular(pessoa: IPessoa): string {
    const contatoComCelular = pessoa.contatos.find(contato => contato.celular);
    return contatoComCelular ? contatoComCelular.celular : 'Não informado';
  }

  editarPessoa(id: number) {
    this.editar.emit(id); // Dispara o evento para o componente pai
  }

  deletarPessoa(id: number) {
    this.deletar.emit(id); // Dispara o evento para o componente pai
  }
}

