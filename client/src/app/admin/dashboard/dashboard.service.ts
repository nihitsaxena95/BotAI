import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { urlConfig } from '../../config/url.config';
import {config} from '../../config/app.config';

@Injectable()
export class DashboardService {

	constructor(private http:Http) { }

	_errorHandler(error: Response){
		return Observable.throw(error || "Server Error");
	}

	getCount(): Observable<any>{

		let url=config.ip+"/counts/getNodesCount";
		console.log(url);
		return this.http
		.get(url)
		.map((res: Response)=> res.json()).catch(this._errorHandler);
	}

	getUnansweredQues(){

		let url=config.ip+"/counts/getUnanswerCount";
		console.log(url);
		return this.http
		.get(url)
		.map((res: Response)=>res.json()).catch(this._errorHandler);
		
	}

}
