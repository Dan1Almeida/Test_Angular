import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endereco } from '../interfaces/endereco';


@Injectable({
  providedIn: 'root',
})
export class ViaCepService {
  private baseUrl: string = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  buscarEnderecoPorCep(cep: string): Observable<Endereco>  {
    const url = `${this.baseUrl}/${cep}/json/`;
    return this.http.get<Endereco>(url);
  }
}
