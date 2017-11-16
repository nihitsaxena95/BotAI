import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DashboardUserService {
  constructor() {
  }

/*-----------error handling----------------*/
  // _errorHandler(error: Response){
  //   return Observable.throw(error || Config.userDashboard.serverError)
  // }
}