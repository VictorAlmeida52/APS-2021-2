import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Estado } from '../models/estado';
import { Acidente } from '../models/acidentes';
import { AcidentesService } from '../services/acidentes.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-acidentes-page',
  templateUrl: './acidentes-page.component.html',
  styleUrls: ['./acidentes-page.component.css']
})
export class AcidentesPageComponent implements OnInit {

  public acidentes: Acidente[] = new Array<Acidente>()
  public estados: Estado[] = new Array<Estado>()

  public selectedState: any
  public options: any = []
  public overlays: any[] = []
  public cols: any[] =[
    { field: 'data_registro', header: 'Data de Registro' },
    { field: 'estado', header: 'Estado' },
    { field: 'danos', header: 'Danos' },
    { field: 'des_ocorrencia', header: 'Descrição' },
    { field: 'latitude', header: 'Latitude' },
    { field: 'longitude', header: 'Longitude' },
  ];


  // Configurações para exibir/esconder o mapa
  public _display: boolean = false;
  get display() { return this._display; }
  set display(value) {
    this._display = value;
    if (this._display == false) {
      this.options = []
      this.overlays = []
    }
  };

  constructor(private http: HttpClient, private service: AcidentesService) {
    this.getEstados()
    this.getAcidentes()
  }

  stateChanged(event: any): void {
    this.getAcidentes()
    console.log(event.value.sigla);
  }

  showMap(acidente: any) {
    console.log(`${acidente.latitude}, ${acidente.longitude}`);

    this.options = {
      center: {lat: acidente.latitude, lng: acidente.longitude},
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    }
    this.overlays = [
      new google.maps.Marker({position: {lat: acidente.latitude, lng: acidente.longitude}, title:acidente.danos})
    ]
    this.display = true;
  }

  async getAcidentes() {
    let acidentes: Acidente[] = new Array<Acidente>()
    await Promise.resolve(this.service.getAcidentes())
    .then((response: HttpResponse<any>) => {
      if(response.status === 200) {
        (response.body).forEach((obj: any) => {
          const queimada = obj as Acidente
          acidentes.push(queimada)
        })
        this.acidentes = acidentes
      } else {
        console.log('Não foi possível recuperar os dados de queimada para o estado indicado')
      }
    })
  }

  async getEstados() {
    let estados: Estado[] = new Array<Estado>()
    await Promise.resolve(this.service.getEstados())
    .then((response: HttpResponse<any>) => {
      if(response.status === 200) {
        (response.body).forEach((obj: any) => {
          const Estado = obj as Estado
          estados.push(Estado)
        })
        this.estados = estados
      } else {
        console.log('Não foi possível recuperar os dados de Estado para o estado indicado')
      }
    })
  }

  ngOnInit(): void {
  }

}
