import { TestBed, inject, async, getTestBed ,tick, fakeAsync } from '@angular/core/testing';
import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod} from '@angular/http';
import {MockBackend, MockConnection } from '@angular/http/testing';
import {testConfig} from './edit-context.config';
import { EditContextService } from './edit-context.service';

// test suite for edit context service
describe('EditContextService', () => {
  let mockBackend:MockBackend;
  let contextService:EditContextService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditContextService,
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
    contextService =getTestBed().get(EditContextService);
    mockBackend = TestBed.get(MockBackend);
  });

  it('should be created', inject([EditContextService], (service: EditContextService) => {
    expect(service).toBeTruthy();
  }));

  //---------------------------------positive test case for deleteContext----------------------------
  it('should check deleteContext() positive case', fakeAsync(() => {
    let mockResponse=testConfig.res;
    mockBackend.connections.subscribe((connection:MockConnection)=>{
      expect(connection.request.method).toBe(RequestMethod.Post);
      tick();
      connection.mockRespond(new Response(new ResponseOptions({
        body:mockResponse
      })));
    });
    let data=testConfig.res;
    contextService.deleteContext(data).subscribe((res)=>{
      expect(res).toBeDefined();
      expect(res.status).toEqual(data.status);
    });
  }));

  //----------------------------------negative test case for deleteContext------------------------
  it('should check deleteContext() negative case', fakeAsync(() => {
    let mockResponse=testConfig.res;
    mockBackend.connections.subscribe((connection:MockConnection)=>{
      expect(connection.request.method).toBe(RequestMethod.Post);
      tick();
      connection.mockRespond(new Response(new ResponseOptions({
        body:mockResponse
      })));
    });
    let data=testConfig.res
    contextService.deleteContext(data).subscribe((res)=>{
      expect(res).toBeDefined();
      expect(res.status).not.toEqual(null);
    });
  }));

  //---------------------------Positive testcase for getcontext----------------------------------
  it('should check getContext() positive case', fakeAsync(() => {
    let mockResponse=testConfig.mocked
    mockBackend.connections.subscribe((connection:MockConnection)=>{
      expect(connection.request.method).toBe(RequestMethod.Get);
      tick();
      connection.mockRespond(new Response(new ResponseOptions({
        body:mockResponse
      })));
    });
    let data=testConfig.mockk;
    contextService.getContext().subscribe((res)=>{
      expect(res).toBeDefined();
      expect(res[0]._fields[0].properties.name).toEqual(data._fields[0].properties.name);
    });
  }));


  //---------------------------negative testcase for getcontext----------------------------------
  it('should check getContext() negative case', fakeAsync(() => {
    let mockResponse=testConfig.mocked
    mockBackend.connections.subscribe((connection:MockConnection)=>{
      expect(connection.request.method).toBe(RequestMethod.Get);
      tick();
      connection.mockRespond(new Response(new ResponseOptions({
        body:mockResponse
      })));
    });
    let data=testConfig.mockk
    contextService.getContext().subscribe((res)=>{
      expect(res).toBeDefined();
      expect(res[0]._fields[0].properties.name).not.toEqual(null);
    });
  }));
});