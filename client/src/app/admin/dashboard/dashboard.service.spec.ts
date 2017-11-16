import { TestBed, inject, async, getTestBed ,tick, fakeAsync } from '@angular/core/testing';
import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod} from '@angular/http';
import {MockBackend, MockConnection } from '@angular/http/testing';
import {testConfig} from './dashboard.config';
import { DashboardService } from './dashboard.service';

// test suite for edit context service
describe('DashboardService', () => {
  let mockBackend:MockBackend;
  let dashboardService:DashboardService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardService,
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
    dashboardService =getTestBed().get(DashboardService);
    mockBackend = TestBed.get(MockBackend);
  });

  it('should be created', inject([DashboardService], (service: DashboardService) => {
    expect(service).toBeTruthy();
  }));

  //---------------------------------positive test case for getCount----------------------------
  it('should check getCount() positive case', fakeAsync(() => {
    let mockResponse=testConfig.getCount;
    mockBackend.connections.subscribe((connection:MockConnection)=>{
      expect(connection.request.method).toBe(RequestMethod.Get);
      tick();
      connection.mockRespond(new Response(new ResponseOptions({
        body:mockResponse
      })));
    });
    let data=testConfig.getCount;
    dashboardService.getCount().subscribe((res)=>{
      
      
    });
  }));

  //----------------------------------negative test case for getCount------------------------
  it('should check getCount() negative case', fakeAsync(() => {
    let mockResponse=testConfig.getCountNegative;
    mockBackend.connections.subscribe((connection:MockConnection)=>{
      expect(connection.request.method).toBe(RequestMethod.Get);
      tick();
      connection.mockRespond(new Response(new ResponseOptions({
        body:mockResponse
      })));
    });
    let data=testConfig.getCountNegative
    dashboardService.getCount().subscribe((res)=>{
    	console.log('hello', res)
     
      expect(res[0].Domain).toEqual(null);
    });
  }));

  //---------------------------Positive testcase for getUnansweredQues()----------------------------------
  it('should check getUnansweredQues() positive case', fakeAsync(() => {
    let mockResponse=testConfig.unanscount
    mockBackend.connections.subscribe((connection:MockConnection)=>{
      expect(connection.request.method).toBe(RequestMethod.Get);
      tick();
      connection.mockRespond(new Response(new ResponseOptions({
        body:mockResponse
      })));
    });
    let data=testConfig.unanscount;
    dashboardService.getUnansweredQues().subscribe((res)=>{
      expect(res).toBeDefined();
      expect(res.unanscount).toEqual(data.unanscount);
    });
  }));


  //---------------------------negative testcase for getUnansweredQues()----------------------------------
  it('should check getUnansweredQues() negative case', fakeAsync(() => {
    let mockResponse=testConfig.unanscountnegative
    mockBackend.connections.subscribe((connection:MockConnection)=>{
      expect(connection.request.method).toBe(RequestMethod.Get);
      tick();
      connection.mockRespond(new Response(new ResponseOptions({
        body:mockResponse
      })));
    });
    let data=testConfig.unanscountnegative
    dashboardService.getUnansweredQues().subscribe((res)=>{
      expect(res).toBeDefined();
      expect(res.unanscountnegative).toEqual(null);
    });
  }));
});
