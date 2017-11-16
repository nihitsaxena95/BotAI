import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {config} from '../../config/app.config';
import { urlConfig } from '../../config/url.config';
import  Config from './traindomain_en_config';


/*======================Service Class=================================*/
@Injectable()
export class TraindomainService {

  constructor(private http:Http) { }

  /*============================Add Intent& Sentence====================*/
  addSentence(object): Observable<any> {
    let url=config.ip+urlConfig.AdminTrainDomainaddSentence;
    return this.http
    .post(url, {object:object})
    .map((res: Response)=>{
      return res.json()
    }).catch(this._errorHandler);
  }

  /*error handling*/
  _errorHandler(error: Response){
    return Observable.throw(error || Config.Server.Error);
  }
  

  /*==========================Change Intent & Service======================*/
  changeIntent(object): Observable<any> {
    let url1=config.ip+urlConfig.AdminTrainDomainchangeIntent;
    return this.http
    .put(url1,{object:object})
    .map((res: Response)=>res.json()).catch(this._errorHandler);
  }

  /*===========================Fetch Data in Service========================*/
  fetch(object): Observable<any> {
    let url2=config.ip+urlConfig.AdminTrainDomainfetch;
    return this.http
    .get(url2,object)
    .map((res: Response)=>res.json()).catch(this._errorHandler);
  }

  /*============================Save at Mongo ==============================*/
  save(object):Observable<any> {
    let saveurl=config.ip+urlConfig.AdminTrainDomainsave;
    return this.http.post(saveurl,object)
    .map((res:Response) => res.json()).catch(this._errorHandler);
  }

  /* ========================Get Data with prefilled value===================*/
  getdata(name):Observable<any> {
    let getdataurl=config.ip+urlConfig.AdminTrainDomaingetdata+name;
    return this.http.get(getdataurl)
    .map((res:Response) =>res.json()).catch(this._errorHandler);
  }
}
