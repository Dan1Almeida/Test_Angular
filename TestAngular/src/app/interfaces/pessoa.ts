import { IContato } from 'src/app/interfaces/contato';

export interface IPessoa {
  id: number;
  nome: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
  contatos: IContato[];
}
