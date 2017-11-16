import { Component, OnInit } from '@angular/core';
import { ResetPasswordService } from './reset-password.service';
import { Router } from '@angular/router';
import { Config } from './reset-password_en_config';
import swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [ResetPasswordService]
})

export class ResetPasswordComponent implements OnInit {
	data:any={};
	oldpassword:any;
	newpassword:any;
	confirmpassword:any;
  temp:any;
  res:any;
  Config:any=Config;
  alert:any;

  constructor(private resetPasswordService:ResetPasswordService, private router:Router) { }

  /*on page initialization*/
  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem(Config.userResetPassword.localstorage));
    

  }

  /*back to navigatebyurl */
  back(){
    this.router.navigateByUrl('user/dashboardUser');
  }

  /*resent password to get the response*/
  resentpassword(newpassword){
    /*empty fields validations*/
  	if(!this.oldpassword || !this.newpassword || !this.confirmpassword){
  	 swal('',Config.userResetPassword.swalemptymsg,'error')
  	}
    /*password matching validations*/
  	else if(this.newpassword != this.confirmpassword){
      swal('',Config.userResetPassword.swalmatchmsg,'error');
  	}
  	else{
      let post = {
        oldpassword : this.oldpassword,
        newpassword : this.newpassword
      }
      this.resetPasswordService.resetpassword(this.data.data,post)
      .subscribe((res)=>{
        this.res=res;
        if(this.res.status==false){
          swal('',this.res.message,'warning');
        }
        else{
          swal('',Config.userResetPassword.swalsuccmsg,'success');
          this.oldpassword="";
          this.newpassword="";
          this.confirmpassword="";
          this.router.navigateByUrl('/user/dashboardUser');
        }
      },(dataError)=>{         /*error handling*/
        localStorage.removeItem(Config.userResetPassword.localstorage);
        this.router.navigateByUrl('/error');    
      })
    }
  }
}