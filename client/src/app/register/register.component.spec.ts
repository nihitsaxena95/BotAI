import { async, ComponentFixture, TestBed ,getTestBed ,tick, fakeAsync} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {RegisterComponent} from './register.component';

import {RegisterService } from './register.service';
import { Routes, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod} from '@angular/http';
import {MockBackend, MockConnection } from '@angular/http/testing'
import {SignUpRouteStub} from './register-routingStub'
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {testConfig} from './register.config';


export const ButtonClickEvents = {
  left:  { button: 0 },
  right: { button: 2 }
};

export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}

// test suite for register component
describe('RegisterComponent', () => {
  let de:      DebugElement;
  let el:      HTMLElement;
  let mockBackend:any;
  let comp : RegisterComponent;
  let fixture : ComponentFixture<RegisterComponent>;
  let signupService:any;
  let data:any;
  let service:any;
  let registerbtn:any;

  data = testConfig.data;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      FormsModule, HttpModule
      ],
      declarations: [
      RegisterComponent
      ],

      providers:[RegisterComponent,
      {provide : Router, useClass : SignUpRouteStub},
      MockBackend,
      BaseRequestOptions,
      {
        provide: Http,
        deps: [MockBackend, BaseRequestOptions],
        useFactory:
        (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        }
      }],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(RegisterComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RegisterService);
      de = fixture.debugElement.query(By.css('#login-button'));
      el = de.nativeElement;
    })
  }));



  //=================================RouterTesting==========================================

  it('should check success admin login',()=> {
    let regCheck=testConfig.regCheck;

    let router= fixture.debugElement.injector.get(Router);
    const spy = spyOn(service,'post').and.returnValue(
      Observable.of(regCheck)
      )

    const sp1 = spyOn(router, 'navigateByUrl');
    comp.postUser();
    const navArgs = sp1.calls.first().args[0];
    fixture.detectChanges();
    expect(navArgs).toBe('');

    expect(comp.registerdata.name).toEqual(regCheck.name);

  })
  //=================================End of Router Testing==================================



  //-----------------------------Positive Testing SuccessFul Register-----------------------------

  it("signUp test successful", () => {
    comp.data.confirmPassword=testConfig.regCheck.confirmPassword;
    comp.data.contactNo=testConfig.regCheck.contactNo;
    comp.data.email=testConfig.regCheck.email;
    comp.data.name=testConfig.regCheck.name;
    comp.data.password=testConfig.regCheck.password;
    comp.data.username=testConfig.regCheck.username;
    comp.data.status=testConfig.regCheck.status;

    const spy = spyOn(service, 'post').and.returnValue(
      Observable.of(data)
      )
    comp.postUser();
    fixture.detectChanges();
    expect(comp.registerdata.status).toEqual(data.status);
  })




  //------------------------Negative Already  Existing User Testing------------------------------------

  it("SignUp test Already exists credentials", () => {
    comp.data.confirmPassword=testConfig.ConfPass;
    comp.data.contactNo=testConfig.regCheck.contactNo;
    comp.data.email=testConfig.email;
    comp.data.name=testConfig.regCheck.name;
    comp.data.password=testConfig.password;
    comp.data.username=testConfig.regCheck.username;
    comp.data.status=testConfig.status;
    const spy = spyOn(service, 'post').and.returnValue(
      Observable.of(data)
      )

    comp.postUser();
    fixture.detectChanges();
    expect(comp.registerdata.status).toEqual(data.status);
  })



  //===============================Negative Testing for Null Enteries=====================>

  it("SignUp test Empty Field credentials", () => {
    comp.data.status=true;
    const spy = spyOn(service, 'post').and.returnValue(
      Observable.of(data)
      )

    comp.postUser();
    fixture.detectChanges();
    expect(comp.registerdata.status).toEqual(data.status);
  })
});