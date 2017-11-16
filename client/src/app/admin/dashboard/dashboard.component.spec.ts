import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { DashboardService } from  './dashboard.service';
import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod} from '@angular/http';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { FormsModule } from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {MockBackend, MockConnection } from '@angular/http/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }from '@angular/core';
import {testConfig} from './dashboard.config';

/*=============test suite=============*/
describe('Dashboard component', () => {
 let data:any;
 let component: DashboardComponent;
 let fixture: ComponentFixture<DashboardComponent>;
 let de: DebugElement;
 let el : HTMLElement;
 let service:any;
 
 beforeEach(async(() => {
   TestBed.configureTestingModule({
     imports : [
     FormsModule, HttpModule, RouterTestingModule,BrowserAnimationsModule
     ],
     schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
     declarations: [
     DashboardComponent
     ],
     providers : [{ provide : DashboardService},
     MockBackend,
     BaseRequestOptions,
     {
       provide: Http,
       deps : [MockBackend, BaseRequestOptions],
       useFactory:
       (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
         return new Http(backend, defaultOptions);
       }
     }]
   }).compileComponents();
   fixture = TestBed.createComponent(DashboardComponent);
   component = fixture.componentInstance;
   service = fixture.debugElement.injector.get(DashboardService);
   
 }));
 
 // component exist
 it('should create', () => {
   expect(component).toBeTruthy();
 });
 
//---------------------------------positive test case for getCount----------------------------
//   it('should check getCount() positive case', fakeAsync(() => {
//       const spy =spyOn(service,'getCount').and.returnValue(Observable.of(testConfig.getCount));
//     component.getCount();
  
//   fixture.detectChanges();
//   fixture.whenStable().then(()=>{
  
//   console.log('hello comp1',component.nodeCount, 'hey 2 here', testConfig.getCount[0] )  
// expect(component.nodeCount[0]).toEqual(testConfig.getCount[0]);
//   })


//   }));

  //----------------------------------negative test case for getCount------------------------
//   it('should check getCount() negative case', fakeAsync(() => {
//     const spy =spyOn(service,'getCount').and.returnValue(Observable.of(testConfig.getCountNegative));
//     component.getCount();
  
//   fixture.detectChanges();
//   fixture.whenStable().then(()=>{
  
//   console.log('hello comp2',component.nodeCount, 'hey 2 here', testConfig.getCountNegative[0] )  
// expect(component.nodeCount[0]).toEqual(testConfig.getCountNegative[0]);
//    })

//   }));

  //---------------------------Positive testcase for getUnansweredQues()----------------------------------
  it('should check getUnansweredQues() positive case', fakeAsync(() => {
  
  const spy =spyOn(service,'getUnansweredQues').and.returnValue(Observable.of(testConfig.unanscount));
  component.getUnansweredQues();
  
  fixture.detectChanges();
  fixture.whenStable().then(()=>{
  
  console.log('hello comp1',component.unAnsCount, 'hey 2 here', testConfig.getCount[0] )  
expect(component.unAnsCount.unanscount).toEqual(testConfig.unanscount.unanscount);
  
  })

  
  }));


  //---------------------------negative testcase for getUnansweredQues()----------------------------------
  it('should check getUnansweredQues() negative case', fakeAsync(() => {

    const spy =spyOn(service,'getUnansweredQues').and.returnValue(Observable.of(testConfig.unanscountnegative));
  component.getUnansweredQues();
  
  fixture.detectChanges();
  fixture.whenStable().then(()=>{
  
  console.log('hello comp1',component.unAnsCount, 'hey 2 here', testConfig.getCount[0] )  
expect(component.unAnsCount.unanscountnegative).toEqual(testConfig.unanscountnegative.unanscountnegative);
  
  })

  
    }));
    






 });