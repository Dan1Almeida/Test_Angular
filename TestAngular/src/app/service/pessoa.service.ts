import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPessoa } from '../interfaces/pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {


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

  deletarPessoa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/pessoas/${id}`);
  }


}
