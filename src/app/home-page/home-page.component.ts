import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public confirmation_token = ''
  constructor(private route: ActivatedRoute) {
    this.route.fragment.subscribe(fragment => {
      console.log(fragment)
    })
  }

  ngOnInit(): void {
    
  }

}
