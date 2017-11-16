
import { TestBed, inject, async, getTestBed ,tick, fakeAsync  } from '@angular/core/testing';
import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod} from '@angular/http';
import {MockBackend, MockConnection } from '@angular/http/testing'
import { RouterTestingModule } from '@angular/router/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { RedirectComponent } from './redirect.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RedirectService } from './redirect.service';
import {testConfig} from './redirect.config';

// test suite for redirect service
describe('RedirectService', () => {
	let de:  DebugElement;
	let el:  HTMLElement;
	let mockBackend:any;
	let redirectService:any;
	let data:any;

	beforeEach( async(() => {
		TestBed.configureTestingModule({
			providers: [RedirectService,
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


/*-----------Existence of service-------------*/
	it('should be created', inject([RedirectService], (service: RedirectService) => {
		expect(service).toBeTruthy();
	}));


/*---------------testing mock responses ----------------*/	
	it('should insert new  entries', fakeAsync(() => {
		const mockResponse =testConfig.userdata;
		
		const redirectService = getTestBed().get(RedirectService);
		mockBackend=TestBed.get(MockBackend);
		mockBackend.connections.subscribe((connection: MockConnection) => {
			expect(connection.request.method).toBe(RequestMethod.Get);
			tick();
			connection.mockRespond(new Response(new ResponseOptions({body:mockResponse})));
			tick();
		});

		let data: any ;
		data = testConfig.data;

		redirectService.redirectUrl(data.id).subscribe(
			(params) => {
				expect(params).toBeDefined();
				tick();
				expect(params.userdata.status).toEqual(data.status);
				expect(params.message).toBe(data.message);
				expect(params.userdata.id).toEqual(data.id);
				tick();
			});
	}));
});



