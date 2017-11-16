import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import expressUrl from './urls'
import { Config } from './redirect_en_config';

@Injectable()
export class RedirectService {

  constructor(private http:Http) { }


/*-----redirect method to verify user-----*/
  redirectUrl(id:any):Observable<any>{
  	const url=expressUrl.rediectUrl+id;
    //path for server routes
  	return this.http.get(url)
  	.map((res) =><any>res.json())
  	.catch(this._errorHandler);
    //call _errorHAndle() on catching error 
	}

  //error handling
	_errorHandler(error: Response){
		return Observable.throw(error || Config.redirect.serverError)
	}
}

