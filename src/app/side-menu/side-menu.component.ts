import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  
  public showSidebar: boolean = false

  log(): void {
    console.log(this.showSidebar);
    
  }

  constructor() { }

  ngOnInit(): void {
  }

}
