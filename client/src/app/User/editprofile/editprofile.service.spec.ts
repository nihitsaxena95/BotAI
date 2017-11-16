import { TestBed, inject, async, getTestBed ,tick, fakeAsync } from '@angular/core/testing';
import { EditprofileService } from './editprofile.service';
import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod} from '@angular/http';
import {MockBackend, MockConnection } from '@angular/http/testing'
import { RouterTestingModule } from '@angular/router/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { EditprofileComponent } from './editprofile.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


//-----------Test Suite for product service-------------------
describe('Userpolicies Service', () => {
	let de:  DebugElement;
	let el:  HTMLElement;
	let mockBackend:any;
	let productsService:any;
	let data:any;
	let registerbtn:any;
	let productId:any;
	let id:any;
	beforeEach( async(() => {
		TestBed.configureTestingModule({
			providers: [EditprofileService,
			MockBackend,
			BaseRequestOptions,
			{
				provide: Http,
				deps: [MockBackend, BaseRequestOptions],
				useFactory:
				(backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
					return new Http(backend, defaultOptions);
				}
			}]
		})
		.compileComponents();
	}));

	//-------------Test case for checking the service--------
	it('should be created', inject([EditprofileService],
		(service: EditprofileService) => {
			expect(service).toBeTruthy();
		}));
});
