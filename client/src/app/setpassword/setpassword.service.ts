
import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import expressUrls from './urls';
import { Config } from './setpassword_en_config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class SetpasswordService {
   Config:any=Config;
  constructor(private http:Http) { }
 
  setPassword(username:string,id:string,password:any):Observable<any>{

    //changes the password 
    let main:any = {};
    main.password = password;//assigning password to mail object
    main.username=username;//assigning username to mail object
    main._id = id;
    return this.http
    .put(expressUrls.setPassword+'/'+username+'/'+id,main)//call put of set_password route
    .map((res:Response)=><any>res.json())
    .catch(this._errorHandler);
  }

  //mail expire method
  mailExpire(username:string,id:string){
    let main:any = {};
    main._id = id;//assigning id to mail object
    return this.http
    .get(expressUrls.warningPage+'/'+id,main)//getting data from database
    .map((res:Response)=> <any>res.json())
    .catch(this._errorHandler);
    //call _errorHAndle() on catching error 
  }

  _errorHandler(error: Response){
    return Observable.throw(error || Config.setpassword.redirect)
  }
}

