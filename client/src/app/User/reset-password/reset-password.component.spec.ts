import { async, ComponentFixture, TestBed,fakeAsync,inject } from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordService } from './reset-password.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { FormsModule } from '@angular/forms';
import { HttpModule,Http,BaseRequestOptions,XHRBackend } from '@angular/http';
import {MockBackend, MockConnection } from '@angular/http/testing'
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import {testConfig} from './reset-password.config';
/*stubbed class for navigation*/
class RouteStub {
  navigateByUrl(url:string) {return url;}
};
/*Test suite for resetpassword component*/
describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let de: DebugElement;
  let el : HTMLElement;
  let service:ResetPasswordService;
  /*before Each async*/
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [ FormsModule, HttpModule ],
      declarations: [ ResetPasswordComponent ],
      providers : [ {provide: ResetPasswordService},MockBackend,
      BaseRequestOptions,{provide : Router, useClass : RouteStub},
      {
        provide: Http,
        deps: [MockBackend, BaseRequestOptions],
        useFactory:
        (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        }},
        ]
      })
    .compileComponents();
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(ResetPasswordService);
  }));
  /*before Each sync*/
  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  /*Test case for component existence*/
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  /*Positive test for ResetPassword*/
  it("ResetPassword test successful",inject([Router],(router:Router) => {
    component.data={ data:testConfig.userdataResetSucc};
    component.oldpassword= testConfig.Comoldpas;
    component.newpassword = testConfig.Comonewpas;
    component.confirmpassword=testConfig.ComoConfpasSucc;
    component.res=testConfig.resSucc;
    const spy = spyOn(service, 'resetpassword').and.returnValue(
      Observable.of(testConfig.stubdataResetSucc)
      )    
    const sp1 = spyOn(router, 'navigateByUrl');
    component.resentpassword(component.newpassword);
    //const navArgs = sp1.calls.first().args[0];
    fixture.detectChanges();
    expect(component.res.data).toEqual(testConfig.stubdataResetSucc.data);
    //expect(navArgs).toBe('/user/accountsettings');
  }));
  /*unfilled fields test for ResetPassword*/
  // it("ResetPassword test unsuccessful when fields not filled", fakeAsync(() => {
    //   component.data={userdata:testConfig.userdataResetUnsucc};
    //   component.oldpassword= testConfig.Comoldpas;
    //   component.newpassword = testConfig.Comonewpas;
    //   component.res=testConfig.resUnsuccE;
    //   const spy = spyOn(service, 'resetpassword').and.returnValue(
    //     Observable.of(testConfig.stubdataResetUnsuccE)
    //     )
    //   component.resentpassword(component.newpassword);
    //   fixture.detectChanges();
    //   expect(component.res.message).toEqual(testConfig.stubdataResetUnsuccE.message);
    // }));
    /*unmatched passwords fields test for ResetPassword*/
    // it("ResetPassword test unsuccessful when passwords did not match", fakeAsync(() => {
      
      //   component.data={userdata:testConfig.userdataResetUnsucc};
      //   component.oldpassword= testConfig.Comoldpas;
      //   component.newpassword = testConfig.Comonewpas;
      //   component.confirmpassword=testConfig.ComoConfpasUnsuccU;
      //   component.res=testConfig.resUnsuccU;
      //   const spy = spyOn(service, 'resetpassword').and.returnValue(
      //     Observable.of(testConfig.stubdataResetUnsuccU)
      //     )
      //   component.resentpassword(component.newpassword);
      //   fixture.detectChanges();
      //   expect(component.res.message).toEqual(testConfig.stubdataResetUnsuccU.message);
      // }));
      /*Negative test for ResetPassword*/
      // it("ResetPassword test unsuccessful when error returned from database", fakeAsync(() => {
        
        //   component.data={userdata:testConfig.userdataResetUnsucc};
        //   component.oldpassword= testConfig.Comoldpas;
        //   component.newpassword = testConfig.Comonewpas;
        //   component.confirmpassword=testConfig.ComoConfpasUnsuccN;
        //   component.res=testConfig.resUnsuccN;
        //   const spy = spyOn(service, 'resetpassword').and.returnValue(
        //     Observable.of(testConfig.stubdataResetUnsuccN)
        //     )
        //   if (component.res.status==false){
          //     component.resentpassword(component.newpassword);
          //     fixture.detectChanges();
          //     expect(component.res.message).toEqual(testConfig.stubdataResetUnsuccN.message); 
          //   }
          // }));
        });