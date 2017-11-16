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
import { CreateFlowComponent } from './create-flow.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CreateFlowService } from './create-flow.service';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import swal from 'sweetalert2';
import {testConfig } from './create-flow.config' ;

// test suite for create flow component
describe('CreateFlow Component', () => {
  let component: CreateFlowComponent;
  let fixture: ComponentFixture<CreateFlowComponent>;
  let service : any;
  let data:any;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
      ModalModule.forRoot(),TabsModule.forRoot(),
      FormsModule, HttpModule, RouterTestingModule
      ],
      declarations: [ CreateFlowComponent],
      providers : [
      { provide : CreateFlowService },
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
    fixture = TestBed.createComponent(CreateFlowComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(CreateFlowService);

  }));

/*======================component exists========================*/
  it('should create', () => {
    expect(component).toBeTruthy();
  })


  //=============positive testcase get content ==================================
  it( "positive get content testcase", () => {
    let mockResponse1:any=testConfig.mockResponse1;
    const spy = spyOn(service, 'fetch' ).and.returnValue(
      Observable.of(mockResponse1)
      )
    fixture.whenStable().then(() => {
      component.getcontent();
      expect(component.item).toEqual(mockResponse1);
    })
  });


  //=============negative testcase get content ==================================
  it( "negative get content testcase", () => {
    let mockResponse1:any=testConfig.mockResponse1;
    const spy = spyOn(service, 'fetch' ).and.returnValue(
      Observable.of(mockResponse1)
      )
    fixture.whenStable().then(() => {
      component.getcontent();
      expect(component.item).not.toEqual(null);
    })
  });
});