import { TestBed, inject, async, getTestBed ,tick, fakeAsync } from '@angular/core/testing';
import { RegisterService } from './register.service';
import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod} from '@angular/http';
import {MockBackend, MockConnection } from '@angular/http/testing'
import { RouterTestingModule } from '@angular/router/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { RegisterComponent } from './register.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {testConfig} from './register.config';

	// test suite for register service
	describe('RegisterService', () => {
	let de:  DebugElement;
	let el:  HTMLElement;
	let mockBackend:any;
	let signupService:any;
	let data:any;
	let registerbtn:any;

	beforeEach( async(() => {
		TestBed.configureTestingModule({
			providers: [RegisterService,
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

/*----------checking existence of signUp service---------------*/
	it('should be created', inject([RegisterService], (service: RegisterService) => {
		expect(service).toBeTruthy();
	}));

	//-----------------------------MockBackend--------------------------------------------
	it('should insert new  entries', fakeAsync(() => {
		const mockResponse = testConfig.regCheck;

		const alreadyMocked=testConfig.alreadyMocked;

		const emptyField={status:false}
		mockBackend=TestBed.get(MockBackend);
		mockBackend.connections.subscribe((connection: MockConnection) => {
		expect(connection.request.method).toBe(RequestMethod.Post);
		tick();
		if(mockResponse.status==true){
			connection.mockRespond(new Response(new ResponseOptions({body:mockResponse})));
				tick();
		}
		else if(alreadyMocked.status==false){
			connection.mockRespond(new Response(new ResponseOptions({body:alreadyMocked})));
			tick();
			}
		else{
			connection.mockRespond(new Response(new ResponseOptions({body:emptyField})));
			tick();
		}		
	});
}));


//-------------------signup service method testing here--------------------------------

	it("tested of signup service method", fakeAsync(()=>{
		data = testConfig.regCheck;
	let signupService: RegisterService = getTestBed().get(RegisterService);
		signupService.post(data).subscribe((res) => {
			expect(res).toBeDefined();
			tick();
			expect(res.name).toBe(data.name);
			tick();
			expect(res.confirmPassword).toBe(data.confirmPassword);
		});
	}))


/*-------------testing if email already exists when signUp --------------*/
	it("testing of signup already exist user service method", fakeAsync(()=>{
		const alreadyRegister=testConfig.alreadyRegister;

	let signupService: RegisterService = getTestBed().get(RegisterService);
		signupService.post(data).subscribe((alreadyUserRes) => {
			expect(alreadyUserRes).toBeDefined();
			tick();
			expect(alreadyUserRes.status).toBe(alreadyRegister.status);
			tick();		
		});
	}))



/*-------------testing if empty fields when signUp --------------*/
	it("tested of signup sending empty user service method", fakeAsync(()=>{
		const emptyField={status:false}
		let signupService: RegisterService = getTestBed().get(RegisterService);
		signupService.post(data).subscribe((resEmp) => {
			expect(resEmp).toBeDefined();
			tick();
			expect(resEmp.status).toBe(emptyField.status);
			tick();		
		});
	}))
});
