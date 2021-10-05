import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public confirmation_token = ''
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {
    this.route.fragment.subscribe(fragment => {
      const token = fragment?.split('&')?.filter(element => element.includes('confirmation_token='))[0]?.split('=')[1]
      if(token == null) {
        this.router.navigate([''])
      } else {
        this.authService.confirmEmail(token)
        this.router.navigate(['login'], {replaceUrl:true});
      }
    })
  }

  ngOnInit(): void {
    
  }

}
