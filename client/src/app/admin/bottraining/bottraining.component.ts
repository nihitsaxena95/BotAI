import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import {BottrainingService} from './bottraining.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import 'rxjs/add/operator/map';
import { Config } from './bottraining_en_config';
@Component({
  selector: 'app-bottraining',
  templateUrl: './bottraining.component.html',
  styleUrls: ['./bottraining.component.scss'],
  providers: [BottrainingService]
})
export class BottrainingComponent implements OnInit {
  ref:any={};
  Config:any=Config;
  arr:any=[];
  rep:any;
  intentName:any=[];
  contextName:any=[];
  question:any = Config.bottraining.Question;
  intent:any;
  context:any;
  intentValue:any;
  contextValue:any;
  flag:any=0;
  intentWord:any;
  contextWord:any;
  len:any;
  res:any={};
  type:any;
  word:any;
  typename:any;
  tableData: any = [];
  index:any;
  array:any=[];
  object:any ={}; 
  editflag:any;
  syn:any;
  val:any; 
  contexttype:any;
  resp:any;
  refer:any;
  addintent:any;
  labelname:any;
  temp:any;
  synres:any;
  main:any=[];
  priority:any;
  correspondSynonym:any=[];
  adminSynonym:any;
  intentname:any;
  value:any;
  newQuestion:any;
  newgetQuestion:any;
  dropdownListIntent:any = [];
  selectedItemsIntent:any = [];
  dropdownSettingsIntent:any = {};
  dropdownSettingsContext:any={};
  selectedItemsContext:any=[];
   i:any;
  
  constructor(private bottrainingservice:BottrainingService, private router: Router) { }
  ngOnInit() {
    //Value selection in dropdown in intent
    this.dropdownSettingsIntent = {           
      singleSelection: true, 
      text:Config.bottraining.SelectIntent,
      selectAllText:Config.bottraining.SelectAll,
      unSelectAllText:Config.bottraining.UnSelectAll,
      enableSearchFilter: true,
      classes:Config.bottraining.myclass
    };
    //Value selection in dropdown in context 
    this.dropdownSettingsContext = {              
      singleSelection: true, 
      text:Config.bottraining.SelectContext,
      selectAllText:Config.bottraining.SelectAll,
      unSelectAllText:Config.bottraining.UnSelectAll,
      enableSearchFilter: true,
      classes:Config.bottraining.myclass
    };
    this.getunanswer();
    this.getIntent();
    this.getContext();
  }
  //Function called when an item is selected in dropdown in intent
  onItemSelectIntent(item:any){                  
    this.relatedentity(item);
  }
  //Function called when an item is deselected in dropdown in intent
  OnItemDeSelectIntent(item:any){                    
    this.selectedItemsIntent = [];
    this.correspondSynonym = [];
    this.intentname = "";
  }
  //Function called when an item is selected in dropdown in context
  onItemSelectContext(item:any){                
   // this.onItemSelectContext=item;
  }
  //Function called when an item is deselected in dropdown in intent
  OnItemDeSelectContext(item:any){              
  } 
  //Function called when the page is rendered to get the unanswered questions
  getunanswer(){
    this.bottrainingservice.getunanswer()
    .subscribe((res)=>{
      if(res.length > 0) {
        this.arr = [];
        this.ref=res[0].questions;
        res[0].questions.map((ques)=>{

          this.arr.push(ques.question)

        })
      }
    }, (dataError)=>{
      this.router.navigateByUrl('/error'); 
    })
  }

  //Displays the selected quesion in the table
  getQues(ques){                        
    this.newgetQuestion = ques;
    this.bottrainingservice.getQues(ques).subscribe((res)=>{
      this.rep=res;
      this.tableData = [];
      res.map((data)=>{
        if(data.word == "")
          this.word = Config.bottraining.NotFound;
        else
          this.word = data.word;
        if(data.type == "")
          this.type = Config.bottraining.NotFound;
        else
          this.type = data.type;
        if(data.typename == "")
          this.typename = Config.bottraining.NotFound;
        else
          this.typename = data.typename;
        this.tableData.push({word : this.word , type : this.type , typename : this.typename})
      })
    }, (dataError)=>{
      this.router.navigateByUrl('/error'); 
    })
    this.question = ques;
  }
  //When called function displays all the intents and subintents
  getIntent(){
    this.bottrainingservice.getIntent()
    .subscribe((res)=>{
      this.intentName = [];
      res.map((data)=>{
        data._fields.map((name)=>{
          this.intentName.push({
            id : this.intentName.length+1,
            label:name.labels[0],
            itemName:name.properties.name,
            priority:name.properties.priority
          })
        })
      })
      this.res=res;
    }, (dataError)=>{
      this.router.navigateByUrl('/error'); 
    })
  }
  //When called function displays all the contexts present in the database
  getContext(){
    this.bottrainingservice.getContext()
    .subscribe((res)=>{
      res.map((data)=>{
        data._fields.map((name)=>{
          if(name.labels[0] != Config.bottraining.Video && name.labels[0] != Config.bottraining.Link && name.labels[0] != Config.bottraining.Counter){
            this.contextName.push({id:this.contextName.length+1,label:name.labels[0],itemName:name.properties.name});
          }
        })
      })
      this.res=res;
    }, (dataError)=>{
      this.router.navigateByUrl('/error'); 
    })    
  }
  //When called function sets the synonyms of intent to the selected word from the unanswered question  
  setSynonym(intent){
    this.bottrainingservice.setSynonym(intent,this.val)
    .subscribe(res=>{    
      this.ref=res;
      this.getQues(this.newgetQuestion);
      this.relatedentity(this.selectedItemsIntent[0]);
      swal(Config.bottraining.addedsucces,
        'success'
        )
    }, (dataError)=>{
      this.router.navigateByUrl('/error'); 
    })
  }
  //When called function sets the synonym of the contexts to the seleted word from the unanswered question  
  contextSynonym(context){
    this.bottrainingservice.contextSynonym(context[0],this.val)
    .subscribe(res =>{
      swal(Config.bottraining.addedsucces,
        'success'
        )
      this.getQues(this.newgetQuestion);
      //  this.relatedentity(this.selectedItemsIntent[0]);
      this.selectedItemsContext = [];
      this.ref=res
    }, (dataError)=>{
      this.router.navigateByUrl('/error'); 
    })
  }

  //This fnction allows the admin to add any unanswered question
  sendques(question){
    this.newQuestion = "";
    this.bottrainingservice.sendques(question)
    .subscribe(res=>{
      this.getunanswer();
      this.ref=res}, (dataError)=>{
        this.router.navigateByUrl('/error'); 
      })
  }
  //This function allows the admin to remove the word once admin has added the details to it
  remove(index,data) {
    this.tableData.splice(this.tableData.indexOf(data),1);   
  }
  //This function is used to pass the selected value into modal
  call(value,type) {
    this.selectedItemsIntent = [];
    this.correspondSynonym = [];
    this.intentname = "";
    this.val=value;
    this.contexttype=type;
    this.getQues(this.newgetQuestion);
  }
  //This function is used to add a new intent into the database
  addIntent(){
    let flag=0;
    const data={
      label:this.value,
      labelname:this.addintent,
      priority:this.priority
    }
    //This is o validate if all the fields are entered    
    if(this.addintent==undefined || this.priority ==undefined){
      swal('',Config.bottraining.pleasefill,'error');
    }
    //To check if priority is already present in the database    
    else if(this.priority !=undefined){
      this.intentName.map((rep)=>{
        if(rep.priority == this.priority){
          flag++;
        }
      })
      if(flag==0){
        this.bottrainingservice.addIntent(data)
        .subscribe((res)=>{
          this.rep=res;
          if (res.status==true){
            this.resp=res;
            swal('',Config.bottraining.SuccAdded,'success');
            this.getIntent();
          }  
        })
      }
      else{
        swal(Config.bottraining.alreadyexist,'error');
      }
  }    
  }
  //This function is used to add synonym to the newly created intent
  addSynonym(){
    const data= {
      label:this.value,
      labelname : this.addintent,
      syn:this.main
    }
    //This is o validate if all the fields are entered 
    if(this.addintent==undefined || this.main ==undefined){
      swal('',Config.bottraining.pleasefill,'error');
    }else{
      this.bottrainingservice.addSynonym(data)
      .subscribe((ref)=>{
        //this.getIntent();
        if (ref.status==true)
        {
          this.value = "";
          this.addintent = "";
          this.main = [];
          this.refer=ref;
          this.priority="";
          this.temp = "";
          swal(Config.bottraining.addedsucces,
            'success')
          this.router.navigateByUrl('/admin/trainingbot');
        }    
      }, (dataError)=>{
        this.router.navigateByUrl('/error'); 
      })
    }  
  }
  //This functon fetches all the synonyms of the selected intent
  relatedentity(intentName){
    this.intentname=intentName;
    this.bottrainingservice.getRelatedEntity(intentName)
    .subscribe((res)=>{
      this.correspondSynonym=res;
    }, (dataError)=>{
      this.router.navigateByUrl('/error'); 
    })
  }
  //This funcion adds all the synonym to the selected intent  
  addAdminSynonym()
  {  
    this.bottrainingservice.addMoreSynonym(this.adminSynonym,this.intentname)
    .subscribe((res)=>{
      this.adminSynonym = "";
      this.correspondSynonym.push(res._fields[0].properties.name);
    }, (dataError)=>{
      this.router.navigateByUrl('/error'); 
    })
  }
  //This function deletes the synonym of the selected intent
  deletesynonym(syno){  
    this.bottrainingservice.deleteSynonym(syno,this.intentname)
    .subscribe((res)=>{
      this.rep=res;
      this.relatedentity(this.intentname);
    }, (dataError)=>{
      this.router.navigateByUrl('/error'); 
    })
  }
  //This function suggests the synonym of the entered alphabet or word
  suggest(){
    const data= {
      labelname : this.addintent,
      word:this.temp
    }
    this.bottrainingservice.suggest(data)
    .subscribe((ref)=>{
      this.synres=ref;
    }, (dataError)=>{
      this.router.navigateByUrl('/error'); 
    })
  }
  //This function stores the entered synonym in a variable
  select(val){
    this.temp=val;
    this.main.push(val);
    this.temp="";
  }
  //This function deletes the selected intent from the database
  deleteIntent(intent){  
    this.bottrainingservice.deleteIntent(intent)
    .subscribe((res)=>{
      this.rep=res;
      this.selectedItemsIntent = [];
      this.correspondSynonym = [];
      this.intentname = "";
      this.getIntent();
    }, (dataError)=>{
      this.router.navigateByUrl('/error'); 
    })
  }
  //This function remove the question from the table once the admin has answered 
  deletePendingQuestions(ques){
    this.bottrainingservice.deletePendingQuestions(ques)
    .subscribe((res) => {
      this.rep=res;
      this.getunanswer();

     // swal('',Config.bottraining.deleted,'success');
    }, (dataError)=>{
      this.router.navigateByUrl('/error'); 

    });
  }
  //This function is used to tell which button has been selected
  ifselected(val){
    this.value=val;
  }
}