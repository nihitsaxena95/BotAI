import { Component, OnInit } from '@angular/core';
// import { routerTransition } from '../../router.animations';
import {Output, EventEmitter} from '@angular/core';
import {DashboardUserService} from '../dashboard-user/dashboard-user.service';
import {Router} from '@angular/router';
import { Config } from './dashboard-user_en_config';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss'],
  // animations: [routerTransition()],
  providers:[DashboardUserService]
})

export class DashboardUserComponent { 
  Config:any=Config;
  constructor(){};
  ngOnInit(){};

}

/*export class DashboardUserComponent implements OnInit {
  @Output() childEvent=new EventEmitter();
  Config:any=Config;
  definition:string;
  product :any=[];
  data:any;
  maindata:any = [];
  constructor(private DashboardUserService:DashboardUserService, private router:Router) {}
  
  ngOnInit() {
    // this.getproduct();
  }

 
  create(data) {                                                      
    let num = 0;
    for(let i=0;i<data.length;i++) {
      for(let j=0;j<data[i].policy.length;j++) {
        data[i].policy[j].productId = data[i].productId;
        this.maindata.push(data[i].policy[j]);
      }
    }
  }

 
}*/