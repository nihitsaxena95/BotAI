
import { TestBed, inject, async, fakeAsync, getTestBed, tick } from '@angular/core/testing';
import { SetpasswordService } from './setpassword.service';
import { Http, HttpModule , XHRBackend,  ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod} from '@angular/http';
import {MockBackend, MockConnection } from '@angular/http/testing'
import { RouterTestingModule } from '@angular/router/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { SetpasswordComponent } from './setpassword.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { testConfig } from './setpassword.config'
describe('SetpasswordService', () => {

	let de:  DebugElement;
	let el:  HTMLElement;
	let mockBackend:any;
	let setPasswordService:any;
	let data:any;
	let registerbtn:any;

	// test suite for set password service
	beforeEach( async(() => {
		TestBed.configureTestingModule({
			providers: [SetpasswordService,MockBackend,
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

	it('should be created', inject([SetpasswordService], (service: SetpasswordService) => {
		expect(service).toBeTruthy();
	}));

	// test case for setpassword new entries
	it('should mocked setPassword new  entries', fakeAsync(() => {

		const setPasswordRes = testConfig.data;
		
		const emptyField={status:false}

		
		mockBackend=TestBed.get(MockBackend);
		mockBackend.connections.subscribe((connection: MockConnection) => {
			expect(connection.request.method).toBe(RequestMethod.Put);
			tick();
			if(setPasswordRes.status==true){
				connection.mockRespond(new Response(new ResponseOptions({body:setPasswordRes})));
				tick();
			}
			

			
		});

	}));


	// test case for set password
	it("tested of setPassword service method", fakeAsync(()=>{
		const data = testConfig.serviceData;

		let setpasswordService: SetpasswordService = getTestBed().get(SetpasswordService);

		setpasswordService.setPassword(data.userdata.id, data.userdata.name, data.userdata.username).subscribe(
			(res) => {
				expect(res).toBeDefined();
				tick();
				expect(res.message).toBe(data.message);
				tick();
				
			});
		
	}))




});
