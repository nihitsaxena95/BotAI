import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable' ;
import {config} from '../../config/app.config';
import { urlConfig } from '../../config/url.config';
import {Config} from  './bottraining_en_config';

@Injectable()
export class BottrainingService {

  constructor(private http:Http) { }

  //getting all unanswered questions
  getunanswer():Observable<any>{
    let url:any = config.ip+urlConfig.AdminBotTraininggetunanswer;
    let userData = JSON.parse(localStorage.getItem(Config.bottraining.localStorage)).data;
    return this.http.get(url)
    .map((res:Response) =>{
      return res.json();
    }).catch(this._errorHandler); /*error handling*/
  }

  /*error handling*/
  _errorHandler(error: Response){
    return Observable.throw(error || Config.bottraining.Server);
  }
  
  //getting all the combinations of unanswered questions
  getQues(ques):Observable<any>{
    let Quesurl:any = config.ip+urlConfig.AdminBotTraininggetQues;
    return this.http.post(Quesurl,{ques}).map((res)=>{
      return res.json();
    }).catch(this._errorHandler); /*error handling*/
  }  

  //getting all the intents present
  getIntent(){
    let url:any = config.ip+urlConfig.AdminBotTraininggetIntent;
    return this.http.get(url)
    .map((res:Response) =>{
      return res.json();
    }).catch(this._errorHandler); /*error handling*/
  }

  //getting all the context stored in database
  getContext(){
    let url:any = config.ip+urlConfig.AdminBotTraininggetContext;
    return this.http.get(url)
    .map((res:Response) =>{
      return res.json();
    }).catch(this._errorHandler); /*error handling*/
  }  

  /*================================Add Intent& Sentence====================*/
  addSentence(object): Observable<any> {
    let url=config.ip+urlConfig.AdminBotTrainingaddSentence;
    return this.http
    .post(url, {object:object})
    .map((res: Response)=>{
      return res.json()
    }
    ).catch(this._errorHandler); /*error handling*/
  }

  /*============================Change Intent & Service======================*/
  changeIntent(object): Observable<any> {
    let url1=config.ip+urlConfig.AdminBotTrainingchangeIntent;
    return this.http
    .put(url1,{object:object})
    .map((res: Response)=>
      res.json()
      ).catch(this._errorHandler); /*error handling*/
  }

  /*===========================Fetch Data in Service========================*/
  fetch(object): Observable<any> {
    let url2=config.ip+urlConfig.AdminBotTrainingfetch;
    return this.http
    .get(url2,object)
    .map((res: Response)=>
      res.json()
      ).catch(this._errorHandler); /*error handling*/
  }

  /*======================set synonym==========================*/
  setSynonym(intent,word): Observable<any> {
    let synUrl=config.ip+urlConfig.AdminBotTrainingsetSynonym;
    return this.http
    .post(synUrl,{intent:intent,word:word})
    .map((res: Response)=>
      res.json()
      ).catch(this._errorHandler); /*error handling*/
  }

  // adding synonyms of existing contexts
  contextSynonym(context,word): Observable<any> {
    let synUrl=config.ip+urlConfig.AdminBotTrainingcontextSynonym;
    return this.http
    .post(synUrl,{context:context,word:word})
    .map((res: Response)=>{
      return res.json()
    }
    ).catch(this._errorHandler); /*error handling*/
  }

  // adding new question to database
  sendques(question){
    let synUrl=config.ip+urlConfig.AdminBotTrainingsendques;
    return this.http
    .post(synUrl,{question:question})
    .map((res: Response)=>
      res.json()
      ).catch(this._errorHandler); /*error handling*/
  }

  /*==========================Start of Adds New Intent==============================*/
  addIntent(intent):Observable<any> {
    let trainurl=config.ip+urlConfig.AdminBotTrainingaddIntent;
    return this.http.post(trainurl,{data:intent})
    .map((res:Response)=>{
      return res.json();
    }).catch(this._errorHandler); /*error handling*/
  }

  /*==========================Start of Add Intent's Synonym==============================*/
  addSynonym(data): Observable<any> {
    let trainurl=config.ip+urlConfig.AdminBotTrainingaddSynonym;
    return this.http
    .put(trainurl,{data: data})
    .map((res: Response)=>{
      return res.json()
    }).catch(this._errorHandler); /*error handling*/
  }

  // getting all the synonym of an intent
  getRelatedEntity(intentName:any){
    let url:any = config.ip+urlConfig.AdminBotTraininggetRelatedEntity;
    return this.http
    .post(url,{intentName})
    .map((res:Response) =>{
      return res.json();
    }).catch(this._errorHandler); /*error handling*/
  }

  // adding more synonyms to existing intent
  addMoreSynonym(synonymname:any,intentName:any){
    let url:any = config.ip+urlConfig.AdminBotTrainingaddMoreSynonym;
    return this.http.post(url,{synonymname,intentName})
    .map((res:Response) =>{
      return res.json();
    }).catch(this._errorHandler); /*error handling*/
  }

  // deletes existing synonym of an intent
  deleteSynonym(synonymname:any,intentname:any){
    let url:any = config.ip+urlConfig.AdminBotTrainingdeleteSynonym;
    return this.http.put(url,{synonymname,intentname})
    .map((res:Response) =>{
      return res.json();
    }).catch(this._errorHandler); /*error handling*/
  }   

  /*==========================Start of Suggest Synonym==============================*/
  suggest(data): Observable<any> {
    let suggesturl=config.ip+urlConfig.AdminBotTrainingsuggest;
    return this.http
    .put(suggesturl,{data: data})
    .map((res: Response)=>{
      return res.json().data
    }).catch(this._errorHandler); /*error handling*/
  }

  /*=====================delete intent=========================*/
  deleteIntent(intent): Observable<any> {
    let deleteIntentUrl=config.ip+urlConfig.AdminBotTrainingdeleteIntent;
    return this.http
    .put(deleteIntentUrl,{data: intent})
    .map((res: Response)=>{
      return res.json()
    }).catch(this._errorHandler); /*error handling*/
  }

  /*=====================delete pending questions=========================*/
  deletePendingQuestions(ques): Observable<any> {
    let deletePendingQuestions=config.ip+urlConfig.AdminBotTrainingdeletePendingQuestions;
    return this.http
    .put(deletePendingQuestions,{ques: ques})
    .map((res: Response)=>{
      return res.json();
    }).catch(this._errorHandler); /*error handling*/
  } 
  
}