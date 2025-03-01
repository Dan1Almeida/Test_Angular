import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPessoa } from '../interfaces/pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  atualizarPessoa(id: string, value: any) {
    throw new Error('Method not implemented.');
  }

  url = environment.url;

  constructor(private readonly http: HttpClient) { }

  buscarPessoaPorId(id: string): Observable<IPessoa> {
    return this.http.get<IPessoa>(`${this.url}/pessoas/${id}`);
  }

  cadastrarPessoa(pessoa: IPessoa): Observable<IPessoa> {
    return this.http.post<IPessoa>(`${this.url}/pessoas`, pessoa);
  }

  listarPessoas(): Observable<IPessoa[]> {
    return this.http.get<IPessoa[]>(`${this.url}/pessoas`);
  }

  editarPessoa(id: string, pessoa: IPessoa): Observable<IPessoa> {
    return this.http.put<IPessoa>(`${this.url}/pessoas/${id}`, pessoa);
  }

}
