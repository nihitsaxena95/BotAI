import { Component, OnInit } from '@angular/core';
import { EditprofileService } from './editprofile.service';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import swal  from 'sweetalert2';
import Config from './editprofile_en_config';


@Component({
	selector: 'app-editprofile',
	templateUrl: './editprofile.component.html',
	styleUrls: ['./editprofile.component.scss'],
	animations: [routerTransition()],
	providers : [ EditprofileService ]
})
export class EditprofileComponent implements OnInit {
	Config:any=Config;
	userData : any;
	cnfmPassword : string;
	ref : any;
	constructor(private editprofileService : EditprofileService, private router : Router) { }
	
	/*on page initialization*/
	ngOnInit() {
		this.userData = JSON.parse(localStorage.getItem(Config.editProfile.localstorage));  //getting userdata from localstorage
     
		this.userData = this.userData;
		console.log(this.userData);
	}

	// redirect user to dashboard
	gotoDashboard() {
		this.router.navigateByUrl('/user/chat'); 
	}
  
 // redirect user to reset password 
 gotoResetPassword() {
		this.router.navigateByUrl('/user/resetpassword'); 
	}

	// matching password and confirm password
	passwordvalidation() {   
		if(this.userData.data.password!==this.cnfmPassword){
			swal(

				Config.editProfile.msg1,
				Config.editProfile.msg2,
				'error'

				)
		}
	}

	// submit edited value in user profile
	submit() {
		if(!this.userData.data.name || !this.userData.data.email ){

			swal(Config.editProfile.msg3);

		}

		else  {  // send entered data to service
			this.editprofileService.submit(this.userData)
			.subscribe(ref => {
				if(ref.status == false) {  // if server returns any error
					swal(

						Config.editProfile.msg1,
						Config.editProfile.msg6

						)
				}
				else {			// if updated successfully
					swal(

						Config.editProfile.msg4,
						Config.editProfile.msg5

						)
					this.router.navigateByUrl('/')
				}
			},(dataError)=>{
				localStorage.removeItem(Config.editProfile.localstorage);
				this.router.navigateByUrl('/error');
			});
		}
		
	}
}
