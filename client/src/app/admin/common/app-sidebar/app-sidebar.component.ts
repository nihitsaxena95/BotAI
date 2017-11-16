import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls:['./app-sidebar.component.css']
})
export class AppSidebarComponent { 

	constructor(private router: Router){}

    logOut(){
        console.log("You are here")
        localStorage.removeItem('Userdata');
        localStorage.removeItem('key');
        localStorage.removeItem('isLoggedin');
        this.router.navigateByUrl('/login');
    }

}
