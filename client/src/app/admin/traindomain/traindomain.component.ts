import { Component, OnInit } from '@angular/core';
import { TraindomainService} from './traindomain.service';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { ActivatedRoute,Router } from '@angular/router';
import  Config from './traindomain_en_config';
/*Component for train Domain */
@Component({
  selector: 'app-traindomain',
  templateUrl: './traindomain.component.html',
  styleUrls: ['./traindomain.component.scss'],
  providers:[TraindomainService]
})
export class TraindomainComponent implements OnInit {
  value:any;
  Config:any=Config;
  productdata:any = {question : []};
  type:any[];
  ansType:any[] = [];
  testflagon:boolean = false;
  helpFlag:number = 0;
  tempid:any=0;
  tempdata:any = {};
  tempvalue:any;
  op:any;
  answerflow:any[] = [];
  tempflow:any[] = [];
  nextquestion:any;  
  answerarr:any[] = [];
  questionarr:any[] = [];
  input:any;
  next:any;
  testflag:boolean = false;
  testflow:any[] = [];
  testanswertype:any;
  currentflow:any;
  ans:any;

  constructor(private traindomainService:TraindomainService, private routeparams:ActivatedRoute, private router:Router) { }
  
  // runs on initialization
  ngOnInit() {
    this.type = [{value : Config.ques.intro},
    {value : Config.ques.quest},
    {value : Config.ques.conclusion}]
    this.ansType = [{value : Config.ques.yesno},
    {value : Config.ques.mcq},
    {value : Config.ques.number}]
    this.value=this.routeparams.params.subscribe((para)=>{ 
      this.productdata.task=para.name;
      this.op = para.op;
      
      if(this.op == Config.ques.edit) {
        this.editdata(para.name);
      }
    })
  }
  //======OnClick Instructions=======//
  instructions(){
    this.helpFlag = 1;
  }
  //=====removing Instructions==========//
  instructionsClose(){
    this.helpFlag = 0;
  }

  // function for edit data
  editdata(name) { 

    this.traindomainService.getdata(name).subscribe((res) => {

      this.productdata = res;

    }, (dataError)=>{
      this.router.navigateByUrl('/error')

    })
  }
  
  // function for get detail
  getDetail(data) {
    this.tempvalue = data;

    if (data==Config.ques.intro) {
      this.tempid = this.setId();
      this.tempdata = {genre : Config.ques.intro, id : this.tempid, type : Config.ques.type1};
    } else if (data == Config.ques.quest) {
      this.tempid = this.setId();
      this.tempdata = {genre : Config.ques.quest, id : this.tempid, type : Config.ques.type1};
    } else {
      this.tempid = this.setId();
      this.tempdata = {genre : Config.ques.conclusion, id : this.tempid, type :Config.ques.type1};
    }
  }

  // function for setting id
  setId() {
    let m = 0;
    this.productdata.question.map((data) => {
      if(data.genre == Config.ques.quest || data.genre == Config.ques.intro || data.genre == Config.ques.conclusion) {
        m++;
      }
    })
    return ++m;
  }
  
  // function for setting next question
  setnext(data) {
    this.nextquestion = data;
    this.productdata.question.map((data)=> {
      if(data.genre == Config.ques.quest || data.genre == Config.ques.conclusion) {
        this.questionarr.push(data);
      }
    })
    let index = this.questionarr.indexOf(data);
    if(index > -1) {
      this.questionarr.splice(index,1);
    }
    if (data.answertype == Config.ques.yesno) {
      this.answerarr = [Config.ques.yes,Config.ques.no];
    } else if(data.answertype = Config.ques.mcq) {
      for(let i=1;i<=data.option.length;i++) {
        this.answerarr.push(i);
      }
    }
  }
  
  // function for adding answer flow
  addanswerflow(input,next) {
    let sample = {
      input : input,
      next : parseInt(next)
    }
    this.answerflow.push(sample);
    if(input == Config.ques.remain) {
      this.answerarr = [];
    } else  {
      let index = this.answerarr.indexOf(parseInt(input));
      if(index > -1) {
        this.answerarr.splice(index,1);
      }  
    }
    this.input = "",
    this.next = "";
  }
  
  // function for arrage answers
  arrangeAnswer() {  
    this.testflagon = true;
    if(this.answerflow.length > 0) {
      if(this.nextquestion.genre == Config.ques.intro) {
        for(let i=0;i<this.productdata.question.length;i++) {
          if(this.productdata.question[i].id == this.nextquestion.id && this.productdata.question[i].type != Config.ques.type1) {
            this.answerflow.map((data) => {
              if(data.input == Config.ques.yes && this.productdata.question[i].answer == Config.ques.ayes) {
                this.productdata.question[i].next = data.next;
              } else if(data.input == Config.ques.no && this.productdata.question[i].answer == Config.ques.ano) {
                this.productdata.question[i].next = data.next;
              }
            })
          }
        }
      } else {
        this.answerflow.map((data) => {
          if(data.input != Config.ques.remain) {
            let sample = {
              id : this.nextquestion.id,
              input : data.input,
              type : Config.ques.type2,
              answer : true,
              next : data.next
            }
            this.productdata.question.push(sample);
          }
        })
      }
    }
    this.questionarr = [];
    this.answerarr = [];
    this.answerflow= [];
  }

  // function for set input
  setInput(ans) {
    this.input = ans;
  }

  // function for set next part
  setNextpart(ans) {
    this.next = ans;
  }

  // function for set ans type
  setAnstype(data,main) {
    this.tempdata.answertype = data;
    if(data==Config.ques.yesno && main==Config.ques.intro) {
      let yes =  { id : this.tempid,
        answer : Config.ques.ayes,
        exit : false
      }
      let no =  { id : this.tempid,
        answer : Config.ques.ano,
        exit : false
      }
      this.tempflow.push(yes);
      this.tempflow.push(no);
    } else if(data==Config.ques.yesno && main == Config.ques.quest) {
      let fall = {
        id : this.tempid,
        answer : false,
        message : Config.ques.msg1,
        type : Config.ques.type3,
        next : this.tempid
      }
      this.tempflow.push(fall);
    } else if(data==Config.ques.mcq) {
      this.tempdata.option = [{id : 1, value : ""},{id : 2, value : ""}]
      let fall = {
        id : this.tempid,
        answer : false,
        message : Config.ques.msg1,
        type : Config.ques.type3,
        next : this.tempid
      }
      this.tempflow.push(fall);
    } else if(data==Config.ques.yesno && main==Config.ques.conclusion) {
      let yes =  { id : this.tempid,
        answer : Config.ques.ayes,
        exit : false
      }
      let no =  { id : this.tempid,
        answer : Config.ques.ano,
        exit : false
      }
      this.tempflow.push(yes);
      this.tempflow.push(no);
    }
  }

  // function for adding option
  addOption() {
    let main = {id : this.tempdata.option.length + 1,value : ""}
    this.tempdata.option.push(main);
  }

  // function for set intro
  setIntro() {
    this.productdata.question.push(this.tempdata);
    this.tempflow.map((data) => {
      this.productdata.question.push(data);
    })
    this.tempdata = {};
    this.tempflow = [];
    this.tempvalue = "";
  }

  // function for set question
  setQuestion() {
    this.productdata.question.push(this.tempdata);
    this.tempflow.map((data) => {
      this.productdata.question.push(data);
    })
    this.tempdata = {};
    this.tempflow = [];
    this.tempvalue = "";
  }

  // function for result
  result(data) {
    this.productdata.result = data;
  }

  // function for saving data
  save() {
    this.traindomainService.save(this.productdata)
    .subscribe((data) => {
      
      this.router.navigateByUrl('/admin/createflow');
    }, (dataError)=>{
    	this.router.navigateByUrl('/error')
    })
  }
  
  //function to check the flow of created answer
  triggerFlow() {   
    this.testflag = true;
    this.productdata.question.map((data) => {
      if(data.genre == Config.save.intro && data.type == Config.save.q && data.id == this.testflag) {
        this.chatadd(data,"");
      }
    })
  }
  
  // function for adding chat
  chatadd(data,ans) {
    this.currentflow = data;
    this.testanswertype = data.answertype
    if(this.currentflow.result) {
      this.testflag = false;
    }
    if(data.message) {
      if(data.option) {
        let temp = {
          bot : data.message,
          option : data.option
        }
        this.testflow.push(temp);
      } else {
        let temp = {
          bot : data.message
        }
        this.testflow.push(temp);
      }
    } else {
      this.testanswer(ans)
    }
  }
  
  // function for test the answer
  testanswer(ans) {
    this.testflow[this.testflow.length -1].user = ans;
    this.ans = ""
    if(!this.currentflow.genre) {
      let next = this.productdata.question.find((data) => {
        if(data.id == this.currentflow.next && data.type == "Q") {
          return data;
        }
      })
      this.chatadd(next,ans);
    } else if(this.testanswertype == Config.save.yesorno) {
      let valid = this.checkansyesno(ans);
      if(this.currentflow.genre == Config.save.intro || this.currentflow.genre == Config.save.conclusion) {
        if(valid) {
          let next = this.productdata.question.find((data) => {
            if(data.answer == Config.save.yes && this.currentflow.id == data.id) {
              return data;
            }
          })
          this.chatadd(next,ans);
        } else {
          let next = this.productdata.question.find((data) => {
            if(data.answer == Config.save.no && this.currentflow.id == data.id) {
              return data;
            }
          })
          this.chatadd(next,ans);
        }
      } else if(this.currentflow.genre == Config.save.question) {
        if(valid) {
          let next = this.productdata.question.find((data) => {

            if(data.answer == valid && this.currentflow.id == data.id && data.input == ans) {
              return data;
            }
          })
          this.chatadd(next,ans);
        } else {
          let next = this.productdata.question.find((data) => {
            if(data.answer == valid && this.currentflow.id == data.id) {
              return data;
            }
          })
          this.chatadd(next,ans);
        }
      }
    } else if(this.testanswertype == Config.save.mcq) {
      let valid = this.checkansmcq(ans);
      if(valid) {
        let next = this.productdata.question.find((data) => {
          if(data.input == ans && this.currentflow.id == data.id && data.answer == valid) {
            return data;
          }
        })
        this.chatadd(next,ans);
      } else {
        let next = this.productdata.question.find((data) => {
          if(data.answer == valid && this.currentflow.id == data.id) {
            return data;
          }
        })
        this.chatadd(next,ans);
      }
    }
  }

  // function for check yesno type answer
  checkansyesno(ans) {
    let yes = Config.save.yesarr;
    let no = Config.save.noarr;
    let flag;
    yes.map((data) => {
      if(data == ans) {
        flag = Config.save.yes;
      }
    })
    no.map((data) => {
      if(data == ans) {
        flag = Config.save.no;
      }
    })
    if(this.currentflow.genre ==Config.save.intro && flag!=undefined) {
      if(flag == Config.save.yes) {
        return true;
      } else {
        return false;
      }
    } else if(this.currentflow.genre == Config.save.question && flag != undefined) {
      return true;
    } else if(this.currentflow.genre ==Config.save.conclusion && flag != undefined) {
      if(flag == Config.save.yes) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // function for check mcq type question
  checkansmcq(ans) {
    let length = this.currentflow.option.length;
    if(ans <= length) {
      return true;
    } else {
      return false;
    }
  }
}