import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Estado } from '../models/estado';
import { Queimada } from '../models/queimada';
import { QueimadasService } from '../services/queimadas.service';

@Component({
  selector: 'app-queimadas-page',
  templateUrl: './queimadas-page.component.html',
  styleUrls: ['./queimadas-page.component.css']
})
export class QueimadasPageComponent implements OnInit {

  public queimadas: Queimada[] = new Array<Queimada>()
  public estados: Estado[] = new Array<Estado>()

  public selectedState: any
  public options: any = []
  public overlays: any[] = []
  public cols: any[] =[
    { field: 'data_hora_gmt', header: 'Horário' },
    { field: 'estado', header: 'Estado' },
    { field: 'municipio', header: 'Municipio' },
    { field: 'satelite', header: 'Satelite' },
    { field: 'latitude', header: 'Latitude' },
    { field: 'longitude', header: 'Longitude' },
  ];

  public  _selectedColumns: any[] = this.cols


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

  constructor(private http: HttpClient, private service: QueimadasService) {
    this.getEstados()
  }

  stateChanged(event: any): void {
    this.getQueimadas(event.value.sigla)
    console.log(event.value.sigla);
  }

  showMap(queimada: any) {
    this.options = {
      center: {lat: queimada.latitude, lng: queimada.longitude},
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    }
    this.overlays = [
      new google.maps.Marker({position: {lat: queimada.latitude, lng: queimada.longitude}, title:queimada.municipio})
    ]
    this.display = true;
  }

  async getQueimadas(estado: string) {
    let queimadas: Queimada[] = new Array<Queimada>()
    await Promise.resolve(this.service.getQueimadas(estado))
    .then((response: HttpResponse<any>) => {
      if(response.status === 200) {
        (response.body).forEach((obj: any) => {
          const queimada = obj as Queimada
          queimadas.push(queimada)
        })
        this.queimadas = queimadas
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

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
      //restore original order
      this._selectedColumns = this.cols.filter(col => val.includes(col));
  }

}
