import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AsideService {

  @Output('idEmitter') idEmitter: EventEmitter<any> = new EventEmitter();

  constructor() { }

}
