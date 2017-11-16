
import { Component, OnInit } from '@angular/core';
import { SetpasswordService } from './setpassword.service';
import { Http } from '@angular/http';
import { ActivatedRoute,Router} from '@angular/router';
import { Config } from './setpassword_en_config';
import swal from 'sweetalert2';

@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.scss'],
  providers:[SetpasswordService],
  /*animations: [routerTransition()]*/
})
export class SetpasswordComponent implements OnInit {
  ref:any={};// variable for response
  password:any='';
  object:any={};
  error:string;
  sub:any;
  id:string;
  username:any;
  Config:any=Config;//reference of config file
  flag:any;
  res:any;
  
  constructor(private setPasswordService:SetpasswordService, private route:ActivatedRoute, private router:Router) { }

  submitted = false;

  //-------------------onSubmit function for validations--------------------------------
  onSubmit() { 
    this.submitted = true; }

    redirect() {
      swal('',Config.setpassword.thankYou,'success');
      this.router.navigateByUrl('');//navigated to user dashboard
    }

    setPassword(object:any){
      if(object.password==undefined || object.confirmpassword==undefined)
      {
        this.error = Config.setpassword.emptyFieldsErrorMessage;
        //validation meassge for empty fields  
      }
      else if(object.password != object.confirmpassword) {
        swal(Config.setpassword.passwordMatchErrorMessage)
        this.error =Config.setpassword.passwordMatchErrorMessage;
        //validations for password and confirm password matching
      }
      else {
        this.sub = this.route.params.subscribe(params => {
          this.username=params['username'];//fetching username from url
          this.id = params['_id']; //fetching object id from url
        },(dataError)=>{
          localStorage.removeItem('Userdata');
          this.router.navigateByUrl('/error');

        });

        this.setPasswordService.setPassword(this.username,this.id,object.password)
        .subscribe((ref)=>{
          this.ref=ref;//assigning response
          if(this.ref != undefined) {
            localStorage.setItem("Userdata",JSON.stringify(this.ref)); 
            //if response is undefined then getting data from local storage 
          }
          this.redirect();//if response is found call redirect()
        },(dataError)=>{
          localStorage.removeItem('Userdata');
          this.router.navigateByUrl('/error');

        });
      }
    }
    mailExpire(){//function to expire link of forgot password if status gets true
     
      this.sub = this.route.params.subscribe(params => {
        this.username=params['username'];//fetch data from url
        this.id = params['_id']; 

      },(dataError)=>{
        localStorage.removeItem('Userdata');
        this.router.navigateByUrl('/error');

      })
      
      this.setPasswordService.mailExpire(this.username,this.id)
      .subscribe((res)=>{
        
        this.res=res;
        if(res.userdata[0].status===true)
          //if status is true after password is changed
        {
          this.router.navigateByUrl('/redirect/'+this.id);
          //navigating to rediect for waring page if link sent on mail expires
        }

        
      },(dataError)=>{
        localStorage.removeItem('Userdata');
        this.router.navigateByUrl('/error');
        //navigate to error page
      })
    } 
    ngOnInit() {   
      this.mailExpire();//call mailExpire() a component loads 
    }
  }
