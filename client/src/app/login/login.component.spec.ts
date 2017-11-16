import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../login/login.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs/Observable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { RouteStub } from './login.config.testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {testConfig} from './login.config.testing';

// test suite for login component
describe('LoginComponent test', () => {
  let de:DebugElement;
  let el:HTMLElement;
  let service:LoginService;
  let router : Router;
  let fixture: ComponentFixture<LoginComponent>;
  let comp:LoginComponent;
  let routestub:any;
  let resdata:any;
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
      FormsModule, BrowserAnimationsModule, HttpModule
      ],
      declarations: [ LoginComponent ],
      providers : [
      {provide : Router, useClass : RouteStub},
      {provide : LoginService}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents().then(() =>  {

      fixture = TestBed.createComponent(LoginComponent);

      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LoginService);
      fixture.detectChanges();
    })
  }));

  //=============================Navigate by url testing for user================================
  it('should check success login',inject([Router], (router:Router)=> {
    let resdata = testConfig.resdata;

    comp.loginDetails.email = testConfig.loginComp.email;
    comp.loginDetails.password = testConfig.loginComp.password;

    const spy = spyOn(service,'loginUsers').and.returnValue(
      Observable.of(resdata)
      )
    const sp1 = spyOn(router, 'navigateByUrl');
    comp.loginUser();
    console.log(sp1);
    const navArgs = sp1.calls.first().args[0];
    fixture.detectChanges();
    expect(navArgs).toBe('/user/dashboardUser');
    expect(comp.ref).toEqual(resdata);
  }))


//=================================Navigate by url testing for admin===============================
  it('should check success admin login',inject([Router], (router:Router)=> {
    let resdata =testConfig.resultData;

    comp.loginDetails.email = testConfig.loginComp.email;
    comp.loginDetails.password = testConfig.loginComp.password;
    const spy = spyOn(service,'loginUsers').and.returnValue(
      Observable.of(resdata)
      )
    const sp1 = spyOn(router, 'navigateByUrl');
    comp.loginUser();
    const navArgs = sp1.calls.first().args[0];
    fixture.detectChanges();
    expect(navArgs).toBe('/admin/dashboardAdmin');
    expect(comp.ref).toEqual(resdata);
  }))
});

//====================================Negative test cases==================================
describe('LoginComponent test negative', () => {
  let de:DebugElement;
  let el:HTMLElement;
  let service:LoginService;
  let router : Router;
  let fixture: ComponentFixture<LoginComponent>;
  let comp:LoginComponent;
  let routestub:any;
  let res:any;
  beforeEach(async(() => {
    res = testConfig.response;
    
    TestBed.configureTestingModule({
      imports: [
      FormsModule, BrowserAnimationsModule, HttpModule
      ],
      declarations: [ LoginComponent ],
      providers : [
      {provide : Router, useClass : RouteStub},
      {provide : LoginService}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents().then(() =>  {
      fixture = TestBed.createComponent(LoginComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LoginService);
      fixture.detectChanges();
    })
  }));


/*-------------test alert for deactivate account------------------*/
  it('should check status false',()=> {
    comp.loginDetails.email = testConfig.loginComp.email;
    comp.loginDetails.password = testConfig.loginComp.password;
    const spy = spyOn(service,'loginUsers').and.returnValue(
      Observable.of(res)
      );
    comp.loginUser();
    fixture.detectChanges(); 
    expect(comp.alert).toEqual(0);
  })

/*----------------test for wrong credentials------------------*/
  it('should check credentials undefined',()=> {
    comp.loginDetails.email =undefined;
    comp.loginDetails.password = undefined;
    const spy = spyOn(service,'loginUsers').and.returnValue(
      Observable.of(res))
    comp.loginUser();
    fixture.detectChanges();         
    expect(comp.alert).toEqual(3);
  })

/*-------------test for invalid credentials---------------*/
  it('should check for invalid credential',()=>{
    const spy = spyOn(service,'loginUsers').and.returnValue(
      Observable.of(res));
    fixture.detectChanges();
    fixture.whenStable().then(() => {      
      expect(comp.ref.message).toEqual(res.message)
    })
  })
});
