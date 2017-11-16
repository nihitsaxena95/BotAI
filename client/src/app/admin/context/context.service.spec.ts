import { TestBed, inject, async, getTestBed ,tick, fakeAsync } from '@angular/core/testing';
import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod} from '@angular/http';
import {ContextService } from './context.service';
import {MockBackend, MockConnection } from '@angular/http/testing';
import {testConfig} from './context.config';

// test suite for context service
describe('ContextService', () => {
  let mockBackend:MockBackend;
  let contextService:ContextService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContextService,
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
    contextService =getTestBed().get(ContextService);
    mockBackend = TestBed.get(MockBackend);
  });

  //---------------------------should run for specific service----------------------------------
  it('should be created', inject([ContextService], (service: ContextService) => {
    expect(service).toBeTruthy();
  }));


  //---------------------------Positive testcase for getallcontext----------------------------------
  it('should check getAllContext() positive case', fakeAsync(() => {
    let mockResponse=testConfig.response
    mockBackend.connections.subscribe((connection:MockConnection)=>{
      expect(connection.request.method).toBe(RequestMethod.Get);
      tick();
      connection.mockRespond(new Response(new ResponseOptions({
        body:mockResponse
      })));
    });

    let data=testConfig.responses
    contextService.getAllContext().subscribe((res)=>{
      expect(res).toBeDefined();
      expect(res[0]._fields[0].properties.name).toEqual(data._fields[0].properties.name);
    });
  }));


  //---------------------------negative testcase for getAllcontext----------------------------------
  it('should check getAllContext() negative case', fakeAsync(() => {
    let mockResponse=testConfig.response
    mockBackend.connections.subscribe((connection:MockConnection)=>{
      expect(connection.request.method).toBe(RequestMethod.Get);
      tick();
      connection.mockRespond(new Response(new ResponseOptions({
        body:mockResponse
      })));
    });
    let data=testConfig.responses;
    contextService.getAllContext().subscribe((res)=>{
      expect(res).toBeDefined();
      expect(res[0]._fields[0].properties.name).not.toEqual(null);
    });
  }));
});