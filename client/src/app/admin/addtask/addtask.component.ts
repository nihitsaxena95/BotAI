import { Component, OnInit } from '@angular/core';
import { AddtaskService } from './addtask.service';
import { Config } from './addtask_en_config';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss'],
  providers : [AddtaskService]
})
export class AddtaskComponent implements OnInit {
  Config:any=Config;
  task:any={};
  data:any=[];
  res:any;
  question : any ;
  postitiveresponse : any;
  negativeresponse : any;
  item1:any=Config.addtask.YesNo;
  item2:any=Config.addtask.Alphabetic;
  item3:any=Config.addtask.Numeric;


  constructor(private addtaskservice : AddtaskService, private router: Router) { }

  ngOnInit() {
  }

  //-----------start of AddQuestion-----------
  AddQuestion(){

    if(this.data.length ==0){
      this.data.push({'TaskName' : this.task.name});
    }

    let question = {
      id : this.data.length,
      question : this.task.question,
      answertype : this.task.answertype,
      type : 'Q'
    }

    let positiveresponse = {
      id : this.data.length ,
      answer : this.task.answer,
      question : this.task.response,
      next : this.task.nextstep
    }

    let negativeresponse = {
      id : this.data.length ,
      answer : this.task.nanswer,
      question : this.task.negativeResponse,
      next : this.task.negativenextstep
    }


    this.data.push({question},{positiveresponse},{negativeresponse});
    this.task = "";
  }
  //---------------end of AddQuestion----------------

  //---------------start of Submit-------------------
  Submit(){

      this.addtaskservice.Submit(this.data).subscribe((res)=>{res}, (dataError)=>{
         this.router.navigateByUrl('/error'); 
      })
    }
  //--------------end of Submit----------------------

}