import { TestBed, inject, async, getTestBed ,tick, fakeAsync } from '@angular/core/testing';
import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod} from '@angular/http';
import {MockBackend, MockConnection } from '@angular/http/testing'
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import {testConfig} from './login.config.testing';

/*---------test suite for login service---------*/
describe('LoginService here', () => {
	let mockBackend:MockBackend;
	let loginService: LoginService;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LoginService,
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
		}).compileComponents();
		loginService = getTestBed().get(LoginService);
		mockBackend=TestBed.get(MockBackend);
	});

/*-----------login service exist------------*/
	it('should be created', inject([LoginService], (service: LoginService) => {
		expect(service).toBeTruthy();
	}));

/*------------test to check response-------------*/
	it('should check response', fakeAsync(() => {
		mockBackend.connections.subscribe((connection: MockConnection) => {
			expect(connection.request.method).toBe(RequestMethod.Post);
			tick();
			connection.mockRespond(new Response(new ResponseOptions({body:testConfig.mockResponse})));
			tick();
			;
		});
		let login = testConfig.loginMock;
	}));

/*------------test for defined response-------------*/
	it('should check response data success', fakeAsync(() => {
		let login = testConfig.loginMock;
		loginService.loginUsers(login).subscribe((res) => {
			expect(res).toBeDefined();
			tick();
			expect(res.userdata.name).toBe(testConfig.mmockResponse.userdata.name);
			tick();
			expect(res.status).toBe(testConfig.mmockResponse.status);
		})
	}));

/*-------------test for undefined response------------*/
	it('should check response data fail', fakeAsync(() => {
		let login = testConfig.loginMock;
		loginService.loginUsers(login).subscribe((res) => {
			expect(res).toBeDefined();
			tick();
			expect(res.userdata.name).toBe(testConfig.Response.userdata.name);
			tick();
			expect(res.status).toBe(testConfig.Response.status);
		})
	}));
});
