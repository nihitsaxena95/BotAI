import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {urlConfig } from '../../config/url.config';
import { config } from '../../config/app.config';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class EditprofileService {

	constructor( private http : Http ) { }

	// goto server to hit the request
	submit(userData : any) {  
		let url = config.ip+urlConfig.updateUserdataUrl;
		//const tokenJWT = JSON.parse(localStorage.getItem('Userdata')).token;
		//let headers = new Headers({'Authorization' : tokenJWT});
		return this.http.put(url, userData)
		.map((res:Response) => res.json())    // sending respond to component
		.catch(this._errorHandler);
	}

	// error handling
	_errorHandler(error: Response){  
		return Observable.throw(error)
	}
}
