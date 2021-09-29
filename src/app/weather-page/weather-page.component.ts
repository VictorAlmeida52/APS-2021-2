import { Component, OnInit, SimpleChanges } from '@angular/core';
import * as momentTZ from 'moment-timezone'
import 'moment/locale/pt-br'

@Component({
  selector: 'weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./datetime.component.css', './weatherscroll.component.css', 'weather-page.component.css']
})
export class WeatherPageComponent implements OnInit {
  private API_KEY: string = '76440d5b02e64a2d8f1212714213108'
  public data: any

  public days: string[]
  public months: string[]
  public date: string = ''
  public time: string = ''

  public teste: string = "";

  public showSidebar: boolean = false

  parseInfoHeader(value: number): string{
    return momentTZ(value * 1000).locale('pt-br').format('dddd')
  }

  roundValue(value: number): number {
    return Math.round(value)
  }

  parseImgUrl(url: string): string{
    const formatted = url.substring(2, url.length)
    return `https://${formatted}`
  }

  setData(value: any): void{
    this.data = value
  }

  fetchDataFromApi(latitude: number, longitude: number): void {
    if(latitude && longitude) {
      fetch(`https://api.weatherapi.com/v1/forecast.json?key=${this.API_KEY}&q=${latitude},${longitude}&days=3&aqi=yes&alerts=no`).then(res => res.json()).then(data => {
        console.log(data)
        this.setData(data)
      })
    }
  }

  timeFormatter(ampm: string): string {
    const time = ampm.split(' ')

    if(time[1] === 'AM'){
        return time[0]
    } else {
        const split = time[0].split(':')
        return `${Number.parseInt(split[0]) + 12}:${split[1]}`
    }
  }

  constructor() {
    this.days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    this.months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  }

  ngOnInit(): void {

    this.fetchDataFromApi(-23.6, -46.76)

    setInterval(() => {
      const time = new Date()
      const month = time.getMonth()
      const date = time.getDate()
      const day = time.getDay()
      const hour = time.getHours()
      const minutes = time.getMinutes()

      this.time = (`${(hour < 10? '0'+ hour : hour)}:${(minutes < 10? '0'+minutes: minutes)}`) 
        
      this.date = (`${this.days[day]}, ${date} de ${this.months[month]}`) 

    }, 1000);
    this.time = ''
    this.date = ''
  }

}
