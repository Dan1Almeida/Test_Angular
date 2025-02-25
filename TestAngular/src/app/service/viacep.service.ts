import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Endereco {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  complemento?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ViaCepService {
  private baseUrl: string = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  // Método para buscar o endereço pelo CEP
  buscarEnderecoPorCep(cep: string): Observable<Endereco> {
    const url = `${this.baseUrl}/${cep}/json/`;
    return this.http.get<Endereco>(url);
  }
}
