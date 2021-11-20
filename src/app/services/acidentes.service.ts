import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado';
import { Acidente } from '../models/acidentes';

@Injectable({
  providedIn: 'root'
})
export class AcidentesService {

  getEstados(): Promise<HttpResponse<any>> {
    let responseEstados: Promise<HttpResponse<any>>
    // Faz chamada para o backend e retorna um Observable
    responseEstados = (this.http.get('http://localhost:9000/uf', { observe: 'response', responseType: 'json' })).toPromise()
    return responseEstados
  }

  getAcidentes(): Promise<HttpResponse<any>> {
    let responseAcidentes: Promise<HttpResponse<any>>
    // Faz chamada para o backend e retorna uma Promise
    responseAcidentes = (this.http.get(`http://localhost:9000/acidentes`, { observe: 'response', responseType: 'json' })).toPromise()
    return responseAcidentes
  }

  constructor(private http: HttpClient) { }
}
