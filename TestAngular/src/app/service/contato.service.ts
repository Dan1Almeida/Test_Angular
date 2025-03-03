import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IContato } from '../interfaces/contato';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private readonly url = environment.url;

  constructor(private readonly http: HttpClient) {}

  cadastrarContato(pessoaId: number, contato: IContato): Observable<IContato> {
    return this.http.post<IContato>(`${this.url}/contatos/${pessoaId}`, contato);
  }
}
