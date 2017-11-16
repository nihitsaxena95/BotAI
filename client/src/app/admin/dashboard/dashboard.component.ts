import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { Config } from './dashboard_en_config';
import { DashboardService } from './dashboard.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[DashboardService]
})

export class DashboardComponent { 
  Config:any=Config;
  nodeCount : any = undefined;
  unAnsCount : any = undefined;  
  constructor(private dashboardService : DashboardService){

  };

  ngOnInit(){
    this.getCount();
    this.getUnansweredQues();
  };


  getCount(){
    this.dashboardService.getCount()
    .subscribe((res)=>{
      this.nodeCount = res;
      console.log(this.nodeCount);
    })
  }

  getUnansweredQues(){
    this.dashboardService.getUnansweredQues()
    .subscribe((res)=>{
      this.unAnsCount = res;
      console.log("Unans " , this.unAnsCount);
    })
  }

}