import { Component, OnInit } from '@angular/core';
import { EditContextService } from './edit-context.service';
import swal from 'sweetalert2';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { Router } from '@angular/router';
import { Config } from './edit-context_en_config';

@Component({
	selector: 'app-edit-context',
	templateUrl: './edit-context.component.html',
	styleUrls: ['./edit-context.component.scss'],
	providers:[EditContextService]
})
export class EditContextComponent implements OnInit {
  intentData : any=[];
  Config:any=Config;
  flowitem : any[] = [];
  item:any[]=[];
  flow:any;
  context:any ={};
  synonym:any;
  setDomain:any;
  intent : any ;
  dropdownSettings = {};
  dropdownSettingsContext:any={};
  completeContext : any =[];
  addvideolink:any=[];
  addbloglink:any=[];
  selectIntent = [];
  videolink :any= [];
  contextName:any=[];
  res:any={};
  description :any=[];
  ref:any={};
  intents : any = [];
  contexts : any = [];
  selectedEditContext : any = [];
  video :any = [];
  link : any = [];
  contextSyn:any=[];
  selectedIntent : any =[];
  contextDropDown:any=[];
  contextval:any;
  getContextName:any;
  getContextLabel:any;
  selectedItemsContext:any=[];
  selectedContext : any = {name : "Add to", label : ""};
  addSynonym:any;
  removedVideo : any = [];
  getInfo:any=[];
  flag:any=0;
  
  constructor(private editContextService:EditContextService, private router : Router ) { }

  // on initializing component
  ngOnInit() {
    this.getcontent();
    this.getContext();
    this.editContextService.getAllContext().subscribe((ref) => {
      ref.map((context)=> {
        if(context._fields[0].labels[0] == Config.component.Entity || context._fields[0].labels[0] == Config.component.Domain || context._fields[0].labels[0] == Config.component.SubDomain){
          this.contexts.push({name : context._fields[0].properties.name, label : context._fields[0].labels[0]});
        }
      })
    }, (dataError)=>{
      this.router.navigateByUrl('/error')
    })
    /*=============Dropdown settings==============*/
    this.dropdownSettings = Config.dropdownSettings;
    this.dropdownSettingsContext = Config.dropdownSettingsContext;
  }
  
  /*==================get all context==================*/
  getContext(){
    this.contextDropDown = [];
    this.editContextService.getContext()
    .subscribe((res)=>{
      res.map((data)=>{
        console.log(data._fields);
        data._fields.map((name)=>{
          if(name.labels[0] != Config.component.video && name.labels[0] != Config.component.link && name.labels[0] != Config.component.Counter && name.properties.name != Config.component.type){
            this.contextName.push(name);
            this.contextDropDown.push({id:this.contextDropDown.length+1,label:name.labels[0],itemName:name.properties.name});
          }
        })
      })
      console.log("-------",this.contextDropDown);
      this.res=res;
    } , (dataError)=>{
      this.router.navigateByUrl('/error')
    })
  }

/*======================Delete Context========================*/
  deleteContext(context){
    this.editContextService.deleteContext(context)
    .subscribe((res)=>{
      this.contextDropDown=[];
      this.contextval="";
      this.selectedItemsContext=[];
      this.getContext(); 
      this.ref=res;
      swal(
        Config.swal.msgdeleteContext1,
        Config.swal.msgdeleteContext2,
        'success'
        )
    },  (dataError)=>{
      this.router.navigateByUrl('/error')
    }) 
  }

/*======================seleted intent from Dropdown========================*/
  onEditItemSelect(item:any){
    this.getContextInfo(item);
    this.selectedIntent.push(item);
  }

/*======================seleted context from Dropdown========================*/
  onItemSelectContext(item:any){ 
    this.intents = [];
    this.intentData = [];
    this.contextval=item;
    this.getContextLabel=item.label;
    this.getContextName=item.itemName;
  }

/*======================get context synonyms========================*/
  getContextSynonym(){
    this.contextSyn = [];
    this.editContextService.getContextSynonym(this.contextval)
    .subscribe((res)=>{
      res.map((data)=>{
        data._fields.map((syn)=>{
          if(syn.labels[0]==Config.component.Synonym){
            this.contextSyn.push(syn);
          }
        })
      })
    }, (dataError)=>{
      this.router.navigateByUrl('/error')
    })  
  }

/*======================seleted context details========================*/
  getContextInfo(item){
    this.video=[];
    this.link=[];
    let flag = 1;
    this.getInfo = [];
    this.editContextService.getContextInfo(this.contextval , item)
    .subscribe((res)=>{
      res.answerLinks.map((links)=>{
        links._fields.map((answer)=>{
          if(answer.labels[0]==Config.component.link)
          {
            let blog = {
              id : answer.identity.low,
              name : Config.component.link,
              value : answer.properties.value,
              delete: false
            }
            this.link.push(blog)
            blog = undefined;
          }

          if(answer.labels[0]==Config.component.video)
          {
            let videolink = {
              id : answer.identity.low,
              name : Config.component.video,
              value : answer.properties.value,
              delete: false
            }
            this.video.push(videolink)
            videolink = undefined;
          }
          if(answer.labels[0] == 'Counter') {
           this.flow = answer.properties.value
          }
        })
      })
      let intent = {
        name : res.intentData.name,
        value : res.intentData.value,
        videoLink : Object.assign([],this.video),
        blogLink : Object.assign([],this.link),
        flow : this.flow,
        deleteFlow : false
      }

      if(this.intentData.length == 0) {
       this.intentData.push(intent);
         intent = undefined;
     }
     else {
       this.intentData.map(data => {
         if(data.name != intent.name) {
           this.intentData.push(intent);
           intent = undefined;
         }
        })
       }

    }, (dataError)=>{
      this.router.navigateByUrl('/error')})
  }

/*======================update seleted context========================*/
  updateContext(){
    this.editContextService.updateContext(this.contextval, this.intentData)
    .subscribe((ref) => {
      swal(
      '',
      Config.swal.msgUpdateContext,
      'success'
      );
    } , (dataError)=>{
      this.router.navigateByUrl('/error')
    })
  }

/*======================add more synonyms for selected context========================*/
addMoreSynonym(syn){
  this.editContextService.addMoreSynonym(syn,this.contextval)
  .subscribe((res)=>{
    swal(
      '',
      Config.swal.msgsynonymadd,
      'success'
      );
    this.getContextSynonym();
  }, (dataError)=>{
      this.router.navigateByUrl('/error')
    })
}

/*======================delete synonyms for seleted context========================*/
  deleteSynonym(synonym){
    this.editContextService.deleteSynonym(synonym,this.contextval)
    .subscribe((res)=>{
      swal(
      '',
      Config.swal.msgsynonymdelete,
      'success'
      );
      this.getContextSynonym();
    }, (dataError)=>{
      this.router.navigateByUrl('/error')
    })
  }

/*======================remove video links========================*/
  removeVideo(j,i){
    this.intentData[i].videoLink[j].delete=true;
  }

/*======================remove blog links========================*/
  removeBlog(k,i){
    this.intentData[i].blogLink[k].delete=true;
  }

/*======================add video links========================*/
  addmoreVideoLinks(index){
    this.intentData[index].videoLink.push({ name : "Video",value : "",delete:false});
  }

/*======================add blog links========================*/
  addmoreBlogLinks(index){
    this.intentData[index].blogLink.push({name : "Link",value : "",delete:false});
  }

  /*==============================flow set==================================================  */
  flowpart(data,index) {
    this.intentData[index].flow = data;
  }
/*============================ get all Inent of particular context==========================*/ 

  getAllIntent() {
   this.editContextService.getIntent(this.contextval).subscribe((ref) => {
     ref.map((intent)=> {        
         this.intents.push({id:this.intents.length+1,itemName : intent.properties.name,name : intent.properties.name, value : "", videoLink : [], blogLink : []});
     })
   }, (dataError)=>{
      this.router.navigateByUrl('/error')
    })
 }

 /*================ method call when context is deselected from multi dropdown ==============*/

OnItemDeSelectContext(item:any) {
  this.contextval = null;
}

//==========funtion to fetch flows============//
 getcontent() {
   this.editContextService.fetchflow()
   .subscribe((data) => {
     this.item = data;
     this.item.map((data) => {
       this.flowitem.push(data.task);
     })
   }, (dataError)=>{
      this.router.navigateByUrl('/error')
    })
 }
//==================method to delete existing flow=============//
 deleteFlow(index) {
   this.intentData[index].deleteFlow = true;
   this.intentData[index].hiddenFlow  = this.intentData[index].flow;
   this.intentData[index].flow = null;
 }
//===============method to set the delete flow as false===========//
 undeleteFlow(index) {
   this.intentData[index].deleteFlow = false;
 }

}
