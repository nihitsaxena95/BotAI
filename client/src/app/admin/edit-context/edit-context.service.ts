import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {config} from '../../config/app.config';
import { urlConfig } from '../../config/url.config';
import {Config} from './edit-context_en_config';

@Injectable()
export class EditContextService {

  constructor(private http:Http) { }

  /*==============get all intents for dropdown=================*/
  getIntent(context):Observable<any> {
    let urlIntent=config.ip+urlConfig.AdminEditContextgetIntent;
    return this.http.post(urlIntent,{context : context})
    .map((res:Response)=>{
      return res.json();
    }).catch(this._errorHandler);
  }

  /*error handling*/
  _errorHandler(error: Response){
    return Observable.throw(error || Config.Server.Error);
  }
  

  /*==============get all context for dropdown=================*/
  getAllContext():Observable<any> {
    let urlContext=config.ip+urlConfig.AdminEditContextgetAllContext;
    return this.http.get(urlContext)
    .map((res:Response)=>{
      return res.json();
    }).catch(this._errorHandler);
  }

  /*==============get selected context=================*/
  getContext(){
    let url:any = config.ip+urlConfig.AdminEditContextgetContext;
    return this.http.get(url)
    .map((res:Response) =>{
      return res.json();
    }).catch(this._errorHandler);
  }

  /*==============delete selected context=================*/
  deleteContext(context) : Observable<any> {
    let url:any = config.ip+urlConfig.AdminEditContextdeleteContext;
    return this.http
    .post(url,{data: context})
    .map((res: Response)=>{
      return res.json()
    }).catch(this._errorHandler);
  }

  /*==============get selected context synonym=================*/
  getContextSynonym(context):Observable<any>{
    let url=config.ip+urlConfig.AdminEditContextgetContextSynonym;
    return this.http.post(url,context)
    .map((res)=>{
      return res.json();
    }).catch(this._errorHandler);
  }

  /*==============get selected context details=================*/
  getContextInfo(context , item) :Observable<any>{
    let url=config.ip+urlConfig.AdminEditContextgetContextInfo;
    return this.http.post(url,{context : context, intent : item})
    .map((res)=>{
      return res.json();
    }).catch(this._errorHandler);
  }

  /*==============add more synonyms for context synonym=================*/
  addMoreSynonym(syn,context){
    let url:any = config.ip+urlConfig.AdminEditContextaddMoreSynonym;
    return this.http
    .post(url,{synonym:syn,context:context})
    .map((res: Response)=>{
      return res.json()
    }).catch(this._errorHandler);
  }

  /*==============delete synonym for selected context=================*/
  deleteSynonym(synonym,context){
    let url:any = config.ip+urlConfig.AdminEditContextdeleteSynonym;
    return this.http
    .post(url,{synonym:synonym,context:context})
    .map((res: Response)=>{
      return res.json()
    }).catch(this._errorHandler);
  }

  /*==============update selected context=================*/
  updateContext(contextName, completeContext) {
    let url: any = config.ip+urlConfig.AdminEditContextupdateContext;
    return this.http
    .put(url,{context : contextName, completeContext : completeContext })
    .map((res : Response) => res.json()).catch(this._errorHandler);
  }

  /*=======================fetch flow =================================*/
   fetchflow(): Observable<any> {
     let url=config.ip+urlConfig.AdminEditContexttfetchflow;
     return this.http
     .get(url)
     .map((res: Response)=> {
       return res.json()}).catch(this._errorHandler);
   }
}