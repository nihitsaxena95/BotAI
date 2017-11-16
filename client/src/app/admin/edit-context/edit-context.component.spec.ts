import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {  MockBackend, MockConnection } from '@angular/http/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import swal from 'sweetalert2';
import { testConfig } from './edit-context.config';
import { EditContextComponent } from './edit-context.component';
import { EditContextService } from './edit-context.service';

// test suite for edit context component
describe('EditContextComponent', () => {
  let component: EditContextComponent;
  let fixture: ComponentFixture<EditContextComponent>;
   let service : any;
     let router = {
    navigate: jasmine.createSpy('navigate')
  }

beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
      ModalModule.forRoot(),TabsModule.forRoot(),
      FormsModule, HttpModule, RouterTestingModule
      ],
      declarations: [ EditContextComponent],
      providers : [
      { provide : EditContextService },
        { provide: Router, useValue: router },
      MockBackend,
      BaseRequestOptions,
      {
        provide: Http,
        deps: [MockBackend, BaseRequestOptions],
        useFactory:
        (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        }
      }
      ],      
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(EditContextComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(EditContextService);
  }));

  // component exist test
  it('should create', () => {
    expect(component).toBeTruthy();
  });


    //=============positive testcase delete context ==================================
 it('delete context positive',()=>{
  let data={
    status:true
  }
  const spy =spyOn(service,'deleteContext').and.returnValue(Observable.of(data));
  component.deleteContext(data);
  
  //fixture.detectChanges();
  fixture.whenStable().then(()=>{
    
expect(component.ref.status).toEqual(data.status);
  })
  
})
//=============negative testcase delete context ==================================
it('delete context negative',()=>{
  let data={
    status:true
  }
  const spy =spyOn(service,'deleteContext').and.returnValue(Observable.of(data));
  component.deleteContext(data);
    console.log('zzz',component.ref.status);
  console.log('cc',data.status);
  //fixture.detectChanges();
  fixture.whenStable().then(()=>{
     console.log('zzz---1',component.ref.status);
  console.log('cc--1',data.status);
expect(component.ref.status).not.toEqual(null);
  })
  });
//=============positive testcase delete context ==================================
   it( "positive get context testcase", () => {
     let mockResponse:any ={
           identity: {
           low:0,
           high:1, 
           },   
           labels:[ "Domain"],
           properties: {
            name:"retirement plan"
           },
       }
    const spy = spyOn(service, 'getContext' ).and.returnValue(
      Observable.of(mockResponse)
      )
    //console.log('000000000000000000000000',component)
   //  fixture.detectChanges();
    fixture.whenStable().then(() => {
      component.getContext();
    console.log('000000000000000000000000',component)
      expect(component).toEqual(mockResponse);
    })
  });
//=============negative testcase delete context ==================================
   it( "positive get context testcase", () => {
     let mockResponse:any ={
           identity: {
           low:0,
           high:1, 
           },   
           labels:[ "Domain"],
           properties: {
            name:"retirement plan"
           },
       }
    const spy = spyOn(service, 'getContext' ).and.returnValue(
      Observable.of(mockResponse)
      )
   
   //  fixture.detectChanges();
    fixture.whenStable().then(() => {
      component.getContext();
    
      expect(component).not.toEqual(mockResponse);
    })
  });
});