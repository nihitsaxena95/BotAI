import { TestBed, inject, async, getTestBed ,tick, fakeAsync } from '@angular/core/testing';
import { ResetPasswordService } from './reset-password.service';
import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing'
import { RouterTestingModule } from '@angular/router/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { ResetPasswordComponent } from './reset-password.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {testConfig} from './reset-password.config';


/*Test suite for resetpassword service*/
describe('ResetPasswordService', () => {

	let de:  DebugElement;
	let el:  HTMLElement;
	let mockBackend:any;
	let resetPasswordService:ResetPasswordService;
	let data:any;

	/*before Each async*/
	beforeEach( async(() => {
		TestBed.configureTestingModule({
			providers: [ResetPasswordService,
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

	/*Test case for service existence*/
	it('should be created', inject([ResetPasswordService], (service: ResetPasswordService) => {
		expect(service).toBeTruthy();
	}));

	/*Positive test for reset-password*/
	it('should update entries', fakeAsync(() => {
		const mockResponse = testConfig.mockresPos;
		let resetPasswordService: ResetPasswordService = getTestBed().get(ResetPasswordService);
		mockBackend=TestBed.get(MockBackend);
		mockBackend.connections.subscribe((connection: MockConnection) => {
			expect(connection.request.method).toBe(RequestMethod.Put);
			tick();
			connection.mockRespond(new Response(new ResponseOptions({body:mockResponse})));
			tick();
		});

		//-------------------service method testing here--------------------------------
		let data: any ;
		let password:any;
		data = testConfig.data;
		password=testConfig.password;
		resetPasswordService.resetpassword(data,password).subscribe(
			(res) => {
				expect(res).toBeDefined();
				tick();
				expect(res.data.ok).toBe(data.data.ok);
				tick();
				expect(res.message).toEqual(testConfig.Succmsg);
			});
	}));

	/*Negative test for reset-password*/
	it('Negative test for Reset Password', fakeAsync(() => {
		const mockResponse = testConfig.mockresNeg;
		let resetPasswordService: ResetPasswordService = getTestBed().get(ResetPasswordService);
		mockBackend=TestBed.get(MockBackend);
		mockBackend.connections.subscribe((connection: MockConnection) => {
			expect(connection.request.method).toBe(RequestMethod.Put);
			tick();
			connection.mockRespond(new Response(new ResponseOptions({body:mockResponse})));
			tick();
		});
		//-------------------service method testing here--------------------------------
		let data: any ;
		let password:any;

		data = testConfig.data;
		password=testConfig.password;
		resetPasswordService.resetpassword(data,password).subscribe(
			(res) => {
				expect(res).toBeDefined();
				tick();
				expect(res.data.ok).not.toBe(data.data.ok);
				tick();
				expect(res.data.nModified).not.toEqual(data.data.nModified);
			});
	}));

});