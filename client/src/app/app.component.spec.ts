import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod} from '@angular/http';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { FormsModule } from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {MockBackend, MockConnection } from '@angular/http/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }from '@angular/core';

/*=============test suite=============*/
describe('App component', () => {
 let data:any;
 let component: AppComponent;
 let fixture: ComponentFixture<AppComponent>;
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
     AppComponent
     ],
     providers : [
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
   fixture = TestBed.createComponent(AppComponent);
   component = fixture.componentInstance;

   
 }));
 it('should create', () => {
   expect(component).toBeTruthy();
 });
 

 });