import { Component ,OnInit } from '@angular/core';
import { Config } from './app-header_en_config';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './app-header.component.html',
	styleUrls:['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit{

	config : any;
	Config:any=Config;
	initialCharacter : string;

	 constructor(private router : Router) { 
    //----------------set configuration for floating menu------------
    this.config = Config.bottomchat.thisconfig
  }

  // run function before html render
	ngOnInit(){		
		let data = JSON.parse(localStorage.getItem(Config.bottomchat.Userdata)).data;
			this.initialCharacter=data.name;
			console.log(this.initialCharacter);
	}

	// logout user function
	logout(){
		localStorage.removeItem(Config.bottomchat.Userdata);
		localStorage.removeItem(Config.bottomchat.key);
		localStorage.removeItem(Config.bottomchat.isLoggedin);
		this.router.navigateByUrl('/login');
	}

}
