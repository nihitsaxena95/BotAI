import { TestBed, inject , async, getTestBed ,tick, fakeAsync  } from '@angular/core/testing';
import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod} from '@angular/http';
import {MockBackend, MockConnection } from '@angular/http/testing'
import { RouterTestingModule } from '@angular/router/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddtaskService } from './addtask.service';
import { AddtaskComponent} from './addtask.component';
import {testConfig } from './addtask.config' ;


//------------test suite------------//
describe('AddtaskService', () => {
	let de:  DebugElement;
	let el:  HTMLElement;
	let mockBackend:any;
	let addtaskService:any;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [AddtaskService, 
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
	});

	//------------testing if Service exists------------//
	it('should be created', inject([AddtaskService], (service: AddtaskService) => {
		expect(service).toBeTruthy();
	}));

	//------------ Positive testing of addtask------------//
	it('add task positive test case', fakeAsync(() => {

		let addtaskService : AddtaskService = getTestBed().get(AddtaskService);
		mockBackend = TestBed.get(MockBackend);
		mockBackend.connections.subscribe((connection: MockConnection) => {
			expect(connection.request.method).toBe(RequestMethod.Post);
			tick();
			connection.mockRespond(new Response(new ResponseOptions({body:testConfig.mockResponse})));
			tick();
		});

		addtaskService.Submit(testConfig.mockResponse).subscribe(
			(res) => {
				expect(res).toBeDefined();
				expect(res).toBe(testConfig.mockResponse);
			})
	}))

	//------------ Negative testing iof addtask------------//
	it('add task negative test case', fakeAsync(() => {
		let addtaskService : AddtaskService = getTestBed().get(AddtaskService);
		mockBackend = TestBed.get(MockBackend);
		mockBackend.connections.subscribe((connection: MockConnection) => {
			expect(connection.request.method).toBe(RequestMethod.Post);
			tick();
			connection.mockRespond(new Response(new ResponseOptions({body:testConfig.mockdata})));
			tick();
		});

		addtaskService.Submit(testConfig.mockdata).subscribe(
			(res) => {
				expect(res).toBeDefined();
				expect(res.data).toBe(testConfig.mockdata.data);
			})
	}))
})