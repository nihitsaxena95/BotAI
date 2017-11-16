import { Component, OnInit } from '@angular/core';
import { Config } from './error_en_config';

@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

	Config : any =Config;
	constructor() { }

	ngOnInit() {
	}

}
