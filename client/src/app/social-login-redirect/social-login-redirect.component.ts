import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {Config} from './social-login-redirect_en_config'


@Component({
  selector: 'app-social-login-redirect',
  templateUrl: './social-login-redirect.component.html',
  styleUrls: ['./social-login-redirect.component.css'],
  providers:[CookieService]
})

export class SocialLoginRedirectComponent implements OnInit {
  cookieValue : any;
  userdata : any;
  Config:any=Config;

  constructor( private cookieService: CookieService, private router : Router) {}
 // on page initialising we will get data from localStorage
  ngOnInit() {
    // if data is available in cookie or not?

    this.cookieValue = this.cookieService.get(Config.localStorage); // retriving data from cookie
    console.log(this.cookieValue);
    this.userdata = JSON.parse(this.cookieValue.slice(2,this.cookieValue.length));
    localStorage.setItem(Config.localStorage,JSON.stringify(this.userdata)); // store data to local storage
    this.router.navigateByUrl('/user');  // navigate to /user
  }
}
