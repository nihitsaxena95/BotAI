import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {config} from '../../config/app.config';
import { urlConfig } from '../../config/url.config';
import Config from './context_en_config'

@Injectable()

export class ContextService {

  constructor(private http:Http) { }

  /*=================fetching intents==================*/
  getIntent():Observable<any> {
    let urlIntent=config.ip+urlConfig.AdminContextgetIntent;
    return this.http.get(urlIntent)
    .map((res:Response)=>{
      return res.json();
    }).catch(this._errorHandler);
  }

  /*error handling*/
  _errorHandler(error: Response){
    return Observable.throw(error || Config.Server.ServerError);
  }

  /*===============fetching all context===================*/  
  getAllContext():Observable<any> {
    let urlContext=config.ip+urlConfig.AdminContextgetAllContext;
    return this.http.get(urlContext)
    .map((res:Response)=>{
      return res.json();
    }).catch(this._errorHandler);
  }

  /*===============adding new context===================*/  
  addContext(intent):Observable<any> {
    let url=config.ip+urlConfig.AdminContextaddContext;
    return this.http.post(url,{data:intent})
    .map((res:Response)=>{
      return res.json();
    }).catch(this._errorHandler);
  }

  /*===============adding synonyms to context===================*/  
  addSynonym(data): Observable<any> {
    let url=config.ip+urlConfig.AdminContextaddSynonym;
    return this.http
    .put(url,{data: data})
    .map((res: Response)=>{
      return res.json()
    }).catch(this._errorHandler);
  }

  /*===============adding new context===================*/
  submitContext(context:any,completeContext:any,synonym:any, selectedContext:any):Observable<any> {
    let  createContextUrl= config.ip+urlConfig.AdminContextsubmitContext;
    let createContext = {
      context : context,
      completeContext : completeContext,
      synonym : synonym,
      selectedContext : selectedContext
    }
    return this.http.post(createContextUrl,createContext)
    .map((res:Response)=>{
      return res.json();
    }).catch(this._errorHandler);
  }

  /*=======================fetch flow =================================*/
  fetchflow(): Observable<any> {
    let url3=config.ip+urlConfig.AdminContextfetchflow;
    return this.http
    .get(url3)
    .map((res: Response)=> res.json()).catch(this._errorHandler);
  }

  /*========================add flow task =====================*/
  addflowtask(flowname):Observable<any> {
    let addflowtaskurl=config.ip+urlConfig.AdminContextaddflowtask;
    return this.http
    .post(addflowtaskurl,{flow : flowname})
    .map((res:Response)=>res.json()).catch(this._errorHandler);
  }
}