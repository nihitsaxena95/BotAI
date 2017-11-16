
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ForgotpasswordComponent } from './forgotpassword.component';
import { ForgotpasswordService  } from  './forgotpassword.service';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NO_ERRORS_SCHEMA} from '@angular/core';
import { Router } from '@angular/router';
import { testConfig } from './forgotpassword.config';


// testsuite for forgot password component
describe('ForgotpasswordComponent', () => {
 let router = {
   navigateByUrl: jasmine.createSpy(testConfig.navigate)
 }
 let stubdata:any;
 let de: DebugElement;
 let el : HTMLElement;
 let service: ForgotpasswordService;
 let comp: ForgotpasswordComponent;
 let fixture: ComponentFixture<ForgotpasswordComponent>;

 beforeEach(async(() => {
  

   TestBed.configureTestingModule({
     imports : [
     FormsModule, HttpModule
     ],
     declarations: [ ForgotpasswordComponent ],
     providers : [{ provide :ForgotpasswordService},
      { provide: Router, useValue: router }],
      schemas : [NO_ERRORS_SCHEMA]
   })

   .compileComponents();
   fixture = TestBed.createComponent(ForgotpasswordComponent);
   comp = fixture.componentInstance;
   service = fixture.debugElement.injector.get(ForgotpasswordService);
 }));

//testing mail sent function
 it('Mail sent', () => {
   stubdata = testConfig.stubdata;
   comp.ref.email= testConfig.email;//static email Id
   comp.ref.status=true;
   const spy = spyOn(service, 'forgotPassword').and.returnValue(
   Observable.of(stubdata)
   )//stubing data

   comp.forgotPassword(comp.ref.email);
   fixture.detectChanges();
   expect(comp.ref.status).toEqual(stubdata.status);
   expect(comp).toBeTruthy();
 });

 // 'Error in update status'
 it('Error in update status', () => {
  stubdata = testConfig.errorStubData;
  comp.ref.message= testConfig.errorMessage;
   comp.ref.status=false;
   const spy = spyOn(service, 'forgotPassword').and.returnValue(
   Observable.of(stubdata)
   )
   comp.forgotPassword(stubdata.email);
   fixture.detectChanges();
   expect(comp.ref.status).toEqual(stubdata.status);
   expect(comp.ref.message).toEqual(stubdata.message);
   expect(comp).toBeTruthy();
 });


 // 'Error in sending mail'
 it('Error in sending mail', () => {
  stubdata = testConfig.errorMailData;
  comp.ref.message= testConfig.errorMailMessage;
   comp.ref.status=false;
   const spy = spyOn(service, 'forgotPassword').and.returnValue(
   Observable.of(stubdata)
   )
   comp.forgotPassword(stubdata.email);
   fixture.detectChanges();
   expect(comp.ref.status).toEqual(stubdata.status);
   expect(comp.ref.message).toEqual(stubdata.message);
   expect(comp).toBeTruthy();
 });


 // 'Error in finding mail'
 it('Error in finding mail', () => {
  stubdata = testConfig.errMailFindData
   comp.ref.status=false;
   const spy = spyOn(service, 'forgotPassword').and.returnValue(
   Observable.of(stubdata)
   )
   comp.forgotPassword(stubdata.email);
   comp.message = stubdata.message;
   fixture.detectChanges();
   expect(comp.ref.status).toEqual(stubdata.status);
   expect(comp.message).toEqual(stubdata.message);
   expect(comp).toBeTruthy();
 });

});