import { TestBed, inject, async, getTestBed ,tick, fakeAsync  } from '@angular/core/testing';
import { testConfig } from './forgotpassword.config';
import { ForgotpasswordService } from './forgotpassword.service';
import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod} from '@angular/http';
import {MockBackend, MockConnection } from '@angular/http/testing'
import { RouterTestingModule } from '@angular/router/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { ForgotpasswordComponent } from './forgotpassword.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


// testsuite for forgot password service
describe('ForgotpasswordService', () => {
	let de:  DebugElement;
	let el:  HTMLElement;
	let mockBackend:any;

	let forgotpasswordService:any;
	let data:any;
	//slet registerbtn:any;

	beforeEach( async(() => {
		TestBed.configureTestingModule({
			providers: [ForgotpasswordService,
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

	// 'should be created'
	it('should be created', inject([ForgotpasswordService], (service: ForgotpasswordService) => {
		expect(service).toBeTruthy();
	}));

	// 'should insert new  entries'
	it('should insert new  entries', fakeAsync(() => {

		const mockResponse = testConfig.serviceMockResponse;
		const forgotpasswordService = getTestBed().get(ForgotpasswordService);
		mockBackend=TestBed.get(MockBackend);
		mockBackend.connections.subscribe((connection: MockConnection) => {
			expect(connection.request.method).toBe(RequestMethod.Post);
			tick();
			connection.mockRespond(new Response(new ResponseOptions({body:mockResponse})));
			tick();

		});

		let data = testConfig.serviceMockData;

		forgotpasswordService.forgotPassword(data.email).subscribe(
			(ref) => {
				expect(ref).toBeDefined();
				tick();
				expect(ref.status).toEqual(data.status);
				expect(ref.message).toBe(data.message);
				tick();
			});
	}));

});
