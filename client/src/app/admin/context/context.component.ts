import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { Router } from '@angular/router';
import {ContextService} from './context.service' ;
import swal from 'sweetalert2';
import Config from './context_en_config';

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.scss'],
  providers : [ ContextService ]
})

export class ContextComponent implements OnInit {
  Config:any=Config;
  context:any ={};
  synonym:any;
  setDomain:any;
  intent : any ;
  selectSubInt : any;
  selectedSubIntent : any = {name : "Select SubIntent",value : ""};
  dropdownSettings = {};
  dropdownSubIntentSettings = {};
  dependencyDropdownSettings={};
  completeContext : any =[];
  videolink :any= [];
  res:any={};
  ref:any={};
  intents : any = [];
  subIntents : any = [];
  contexts : any = [];
  selectedEditContext : any = [];
  video :any = [];
  link : any = [];
  contextSyn:any=[];
  selectedIntent : any =[];
  selectedContext : any = {name : Config.resetDomain.label, label : ""};
  item:any[]=[];
  flowdropdownSettings:any = {};
  flowitem:any[] = [];
  flowflag:boolean = false;

  constructor(private contextService: ContextService, private router : Router) { }

  ngOnInit() {
    this.getcontent();
    this.getIntent();
    this.getContext();
    /*==============dropdown settings=================*/
    this.dropdownSettings = Config.dropdownSettings;
    this.dropdownSubIntentSettings = Config.dropdownSubIntentSettings;
    this.flowdropdownSettings =Config.flowdropdownSettings;
    this.dependencyDropdownSettings = Config.dependencyDropdownSettings;
  }
  
  /*===========method to get all the Context========*/
  getAllContext() {
    this.contexts = [];
        this.contextService.getAllContext().subscribe((ref) => {
      ref.map((context)=> {
        if(context._fields[0].labels[0] ==Config.entity.entity || context._fields[0].labels[0] == Config.domain.domain || context._fields[0].labels[0] == Config.subdomain.subdomain){
          this.contexts.push({id:this.contexts.length+1,itemName : context._fields[0].properties.name+' ('+ context._fields[0].labels[0]+')',name: context._fields[0].properties.name , label : context._fields[0].labels[0]});
         }
      })
    })
  }

  /*================function for fetch flows=================*/ 
  getcontent() {
    this.contextService.fetchflow()
    .subscribe((data) => {
      this.item = data;
      this.item.map((data) => {
        this.flowitem.push(data.task);
      })
    })
  }

  /*================function for fetch context=================*/ 
  getContext(){
    this.contexts = [];
    this.contextService.getAllContext().subscribe((ref) => {
      ref.map((context)=> {
        if(context._fields[0].labels[0] ==Config.entity.entity || context._fields[0].labels[0] == Config.domain.domain || context._fields[0].labels[0] == Config.subdomain.subdomain){
          this.contexts.push({name : context._fields[0].properties.name, label : context._fields[0].labels[0]});
        }
      })
    })
  }

  /*===========method to get all the Intents========*/
  getIntent(){
    this.contextService.getIntent().subscribe((ref) => {
      this.intents = [];
      this.subIntents = [];
      ref.map((intent)=> {
        if(intent._fields[0].labels[0] == Config.intent.intent && intent._fields[0].properties.name != Config.type.type){
          this.intents.push({id:this.intents.length+1,itemName : intent._fields[0].properties.name,name : intent._fields[0].properties.name, priority : intent._fields[0].properties.priority, value : "", videoLink : [], blogLink : [], subIntent : []});
        }
        else if(intent._fields[0].labels[0] == Config.subintent.subintent){
          this.subIntents.push({id:this.subIntents.length+1,itemName : intent._fields[0].properties.name,name : intent._fields[0].properties.name, priority : intent._fields[0].properties.priority, value : ""});
        }
      })
    })
  }

  /*============choosing independent dependency==============*/
  setdomain() {
    this.setDomain = true;
  }

  /*============choosing dependency==============*/
  resetDomain() {
    this.selectedContext.name =Config.resetDomain.label;
    this.setDomain = false;
  }

  /*====================setting context after choosing dependency======================*/
  setContext(context) {
    this.selectedContext = context;
  }

  /*=========fetching selected context from dropdown=========*/
  onItemSelect(item:any){
    this.selectedIntent.push(item);
    this.intents.splice(this.intents.indexOf(item),1);
  }

  /*================fetching selected flow from dropdown=================*/
  flowdata:any;
  onItemFlowSelect(item:any,index){
    this.selectedIntent[index].flow = item;
    this.flowdata = "";
  }

  /*================deselecting context from dropdown=================*/
  OnItemDeSelect(item:any){
    this.selectSubInt = undefined;
    this.selectedSubIntent = undefined;
  }

/*=====================dependency dropdown======================*/
onDependencyItemSelect(item:any){
   this.setContext(item);
  }

/*=========================Dependency delselect=========================*/
 OnDependencyItemDeSelect(item:any){
    this.selectedContext = undefined;
   // this.selectedSubIntent = undefined;
  }

  /*====================adding flow for context==========================*/
  addflowtask(flowname) {
    this.contextService.addflowtask(flowname)
    .subscribe((res)=> {
    })
  }

  /*=================flow Part=========================================*/
  flowpart(data,index) {
    this.selectedIntent[index].flow = data;
  }

  /*===================Adding new context======================*/
  submitContext() {
    if(this.setDomain != undefined) {
      if((this.setDomain == true && this.selectedContext.name != Config.resetDomain.label) || this.setDomain == false) {
        this.contextService.submitContext(this.context,this.selectedIntent,this.synonym,this.selectedContext)
        .subscribe((ref) => {
          if(ref.status == true){
            swal('',Config.swal.msg1,'success');
            this.context = {};
            this.synonym = [];
            this.selectedContext = [];
            this.completeContext = [];
            this.getIntent();
            this.getContext();
          }
          else {
            swal('',Config.swal.msg2,'warning');
          }
        })
      }
      else {
        swal('',Config.swal.msg3,'warning');
      }
    }
    else {
      swal('',Config.swal.msg4,'warning');
    }
  }


  /*===============foe removing video links=================*/
  removeVideo(i,j,video){
    this.inputs.splice(this.inputs.indexOf(video),1);
    this.selectedIntent[i].videoLink.splice(j,1);
  }

  /*==================adding new input field foe more video links====================*/
  inputs = [{link : ""}];
  addInput()  {
    this.inputs.push({link: ''});
  }

  /*==================adding new input field foe more blog links====================*/
  blog = [{link : ""}];
  addBlog()  {
    this.blog.push({link: ''});
  }

  /*===============foe removing blog links=================*/
  removeBlog(i,k,blog){
    this.blog.splice(this.blog.indexOf(blog),1);
    this.selectedIntent[i].blogLink.splice(k,1);
  }

  /*=====================setting subintent======================*/
  setsubIntent(subIntent) {
    this.selectedSubIntent = Object.assign({},subIntent);
  }

  /*==============adding subintnt to context==============*/
  pushSubIntent(index,subIntent) {
    let suI =  this.selectedIntent[index].subIntent.find(x => x.name === subIntent.name );
    if(suI==undefined){
      this.selectedIntent[index].subIntent.push({"name":subIntent.name, "value":subIntent.value})
    }
    else{
      this.selectedIntent[index].subIntent.map((suIn)=>{
        if(suIn.name===suI.name){
          suIn.value=subIntent.value;
        }

      })
    }
    this.selectedSubIntent.value = "";
    this.selectedSubIntent.name = Config.pushSubintent.select;
  }
}