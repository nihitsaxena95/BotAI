import { TestBed, inject , async, getTestBed ,tick, fakeAsync  } from '@angular/core/testing';
import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod} from '@angular/http';
import {MockBackend, MockConnection } from '@angular/http/testing'
import { RouterTestingModule } from '@angular/router/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CreateFlowService } from './create-flow.service';
import { CreateFlowComponent} from './create-flow.component';
import {testConfig } from './create-flow.config' ;

//------------test suite------------//
describe('CreateFlowService', () => {
  let de:  DebugElement;
  let el:  HTMLElement;
  let mockBackend:any;
  let createflowService:CreateFlowService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateFlowService, 
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
    }).compileComponents();
    createflowService=getTestBed().get(CreateFlowService)
    mockBackend=TestBed.get(MockBackend);
  });

  //------------testing if Service exists------------//
  it('should be created', inject([CreateFlowService], (service: CreateFlowService) => {
    expect(service).toBeTruthy();
  }));

  //------------ Positive testing of creatflow------------//
  it('positive case for fetch()', fakeAsync(() => {
    let createflowService : CreateFlowService = getTestBed().get(CreateFlowService);
    mockBackend = TestBed.get(MockBackend);
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toBe(RequestMethod.Get);
      tick();
      connection.mockRespond(new Response(new ResponseOptions({body:testConfig.mockResponse})));
      tick();
    });
    createflowService.fetch().subscribe(
      (res) => {
        expect(res).toBeDefined();
        expect(res).toBe(testConfig.mockResponse);
      })
  }));

  //------------ Negative testing for creatflow------------//
  it('negative case for fetch()', fakeAsync(() => {
    let createflowService : CreateFlowService = getTestBed().get(CreateFlowService);
    mockBackend = TestBed.get(MockBackend);
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toBe(RequestMethod.Get);
      tick();
      connection.mockRespond(new Response(new ResponseOptions({body:testConfig.mockdata})));
      tick();
    });
    createflowService.fetch().subscribe(
      (res) => {
        expect(res).toBeDefined();
        expect(res.data).toBe(testConfig.mockdata.data);
      })
  }));
})