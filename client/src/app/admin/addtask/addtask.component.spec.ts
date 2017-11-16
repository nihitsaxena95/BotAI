import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AddtaskComponent } from './addtask.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AddtaskService } from  './addtask.service';
import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod} from '@angular/http';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { FormsModule } from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {MockBackend, MockConnection } from '@angular/http/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }from '@angular/core';
import { testConfig } from './addtask.config';

/*=============test suite=============*/
describe('AddtaskComponent', () => {
  let data:any;
  let component: AddtaskComponent;
  let fixture: ComponentFixture<AddtaskComponent>;
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
      AddtaskComponent
      ],
      providers : [{ provide : AddtaskService},
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
    fixture = TestBed.createComponent(AddtaskComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(AddtaskService);
    
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  /*------------------Positive testing for addtask(AddQuestion)-----------------*/
  it('Should test positive addQuestion', () => {
    const item = testConfig.addtaskComponent
    const spy = spyOn(service,'Submit').and.returnValue(
      Observable.of(item)
      )
    component.data = testConfig.positiveResponse ;
    component.Submit();
    fixture.detectChanges();
    fixture.whenStable().then( ()=> {
      expect(component.res.data.ok).toEqual(1);
    })
    
  });
  /*------------------End Positive testing for addtask(AddQuestion)----------------*/

  /*------------------Negative testing for addtask(AddQuestion)-----------------*/
  it('Should test Negative addQuestion', () => {
    const item = testConfig.addtaskComponent
    const spy = spyOn(service,'Submit').and.returnValue(
      Observable.of(item)
      )
    component.data = testConfig.negativeResponse;
    component.Submit();
    fixture.detectChanges();
    fixture.whenStable().then( ()=> {
      expect(component.res.data.ok).not.toEqual(0);
    })
    
  });
  /*------------------End Negative testing for addtask(AddQuestion)-----------------*/
});