
import { Component, OnInit } from '@angular/core';
import { Config } from './forgotpassword_en_config';
import { ForgotpasswordService } from './forgotpassword.service';
import swal  from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
  providers:[ForgotpasswordService],
})
export class ForgotpasswordComponent implements OnInit {

  email:any;
  ref:any={};
  Config:any=Config;//reference for config file
  message:string;
  alert:any=0;
  flag:number = 0;

  constructor(private forgotpasswordService:ForgotpasswordService, private router:Router) { }
  
  // function for forget password
  forgotPassword(object:any){
    
    if(!object)
    {
      this.flag = 1;
     // swal(Config.forgotpassword.swal);//alert if empty fields 
    }
    else{
      //sending mail to reset password


      this.forgotpasswordService.forgotPassword(object)
      .subscribe((ref)=>{
        
        this.ref=ref;

        if(this.ref.message===Config.forgotpassword.errorInFinfind){
          //checking if mail Id is registered with us 

          swal(Config.forgotpassword.swalId);
        }
        else if(this.ref.status==true){
          swal(Config.forgotpassword.swalPass);
          this.router.navigateByUrl('');
          //redirect to login page from link sent on mail
        }
      },(dataError)=>{
        //error handling
        localStorage.removeItem(Config.forgotpassword.localStorage);
        this.router.navigateByUrl('/error');
        //navigating to error page if any error occurs
      });
    }
  }

  ngOnInit() { }

}
