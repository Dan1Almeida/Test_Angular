import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endereco } from '../interfaces/endereco';


@Injectable({
  providedIn: 'root',
})
export class ViaCepService {
  private readonly baseUrl: string = 'https://viacep.com.br/ws';

  constructor(private readonly http: HttpClient) {}

  buscarEnderecoPorCep(cep: string): Observable<Endereco>  {
    const url = `${this.baseUrl}/${cep}/json/`;
    return this.http.get<Endereco>(url);
  }
}
