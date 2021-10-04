import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado';
import { Queimada } from '../models/queimada';

@Injectable({
  providedIn: 'root'
})
export class QueimadasService {

  getEstados(): Promise<HttpResponse<any>> {
    let responseEstados: Promise<HttpResponse<any>>
    // Faz chamada para o backend e retorna um Observable
    responseEstados = (this.http.get('http://localhost:9000/uf', { observe: 'response', responseType: 'json' })).toPromise()
    return responseEstados
  }

  getQueimadas(estado: string): Promise<HttpResponse<any>> {
    let responseQueimadas: Promise<HttpResponse<any>>
    // Faz chamada para o backend e retorna uma Promise
    responseQueimadas = (this.http.get(`http://localhost:9000/queimadas?estado=${estado}`, { observe: 'response', responseType: 'json' })).toPromise()
    return responseQueimadas
  }

  constructor(private http: HttpClient) { }
}
