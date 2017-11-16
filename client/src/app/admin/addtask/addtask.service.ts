import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable' ;
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import {config} from '../../config/app.config';
import { urlConfig } from '../../config/url.config';
import {Config} from './addtask_en_config'

@Injectable()
export class AddtaskService {

	constructor(private http:Http) { }
	//----------start of Submit method---------------
	Submit(data){
		let url = config.ip+urlConfig.AdminAddTaskSubmit;
		return this.http
		.post(url,{message:data})
		.map((res:Response)=> {
			return res.json()
		}).catch(this._errorHandler);
	}
	//------------end of Submit method----------------

	// error handling
	_errorHandler(error: Response){  
		return Observable.throw(error||Config.addtask.Server)
	}
	
	
}