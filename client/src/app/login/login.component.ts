import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from './multi_en_config';
import {Message} from './login.config.multi_en';
import {Urls} from './login.config.url';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  message:any=Message;
  fbUrl = Urls.fbUrl;
  googleUrl = Urls.googleUrl;
  Config:any=Config;
  loginDetails : any={};
  ref:any;
  alert:Number=0;
  constructor(private loginservice:LoginService,private router:Router) { }

  ngOnInit() {}

  // function for login authenticate user
  loginUser(){
  	if(this.loginDetails.email===undefined || this.loginDetails.password===undefined){
      this.alert=3;
      //validation for emtpy fields
    }
    else{

      this.loginservice.loginUsers(this.loginDetails)
      .subscribe((ref)=>{
        this.ref = ref;
        localStorage.setItem(Config.login.localStorage,JSON.stringify(ref));
        //setting data into localstorage

        if(this.ref.status===true){

          if(this.ref.data.type===Config.login.user) {
            if(this.ref.data.status===true) {  
              //redirect to user dashboard if type is User
              this.router.navigateByUrl('/user/dashboardUser');
            }              
          }
          else if(this.ref.data.type===Config.login.admin)
            this.router.navigateByUrl('/admin/dashboardAdmin')
          //redirect to admin dashboard if type is Admin
        }
        else if(this.ref.status===false){
          if(this.ref.message===Config.login.invalidPassword||this.ref.message===Config.login.invalidUser){
            //validation for invalid Password
            this.alert=2;
          }
          else if(this.ref.status===false && this.ref.data!==undefined) {
            //validation if user has deactivated an account
            this.alert=1;
          }
          return ref;
        }
      },(dataError)=>{         /*error handling*/
        this.alert=2;

      })


    }
  }
  disappear() {
    this.alert = 0;
  }

  //redirect user for register
  register(){
    this.router.navigateByUrl('/register');
  }

}


