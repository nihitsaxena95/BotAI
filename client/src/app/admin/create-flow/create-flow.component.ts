import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CreateFlowService } from './create-flow.service';
import { Config } from './createflow_en_config';

@Component({
  selector: 'app-create-flow',
  templateUrl: './create-flow.component.html',
  styleUrls: ['./create-flow.component.scss'],
  providers : [CreateFlowService]
})
export class CreateFlowComponent implements OnInit {

  constructor(private router:Router, private service:CreateFlowService) { }
  flowname:any;
  Config:any=Config;
  //-----------ngOnInit---------------
  ngOnInit() {
    this.getcontent();
  }

  //--------------start of follow method--------------
  item:any[] = [];
  follow(flowname) {
    let sample = {
      task : flowname
    }
    this.item.push(sample);
    this.flowname = "";
  }
  //---------------end of follow method----------------

  //--------------start of addconfig method---------------
  addconfig(name) {
    this.router.navigate(['/admin/traindomain',name,Config.createflow.new])
  }
  //--------------end of addconfig method---------------

  //--------------start of editconfig method------------------
  editconfig(name) {
    this.router.navigate(['/admin/traindomain',name,Config.createflow.edit])
  }
  //--------------end of editconfig method------------------

  //---------------start of getcontent method----------------
  getcontent() {
    this.service.fetch()
    .subscribe((data) => {
      this.item = data;
    },(dataError)=>{
      this.router.navigateByUrl('/error')
    })
  }
  //---------------end of getcontent method--------------

}