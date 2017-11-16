import { Injectable } from '@angular/core';
import { Config } from './auth.guard_en_config';

import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate {

  Config:any=Config;
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    /*Checking without login cannot go to any link through URL*/
    let data = JSON.parse(localStorage.getItem(Config.localstorage));
    if(data!=null)
    {
      if(data.status==true)
      {
        return true;
      }
    }
    //If not login redirect to login page
    this.router.navigateByUrl('/');
    return false;
  }
}