import { TestBed, inject, async, getTestBed ,tick, fakeAsync } from '@angular/core/testing';
import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod} from '@angular/http';
import { BottrainingService } from './bottraining.service';
import {MockBackend, MockConnection } from '@angular/http/testing';
import {testConfig} from './bottraining.config';

// test suite for bot training service
describe('BottrainingService', () => {
  let mockBackend:MockBackend;
  let intentService:BottrainingService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BottrainingService,
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
    intentService =getTestBed().get(BottrainingService);
    mockBackend = TestBed.get(MockBackend);
  });

  //-----------------------------test case for specific service------------------------------------
  it('should be created', inject([BottrainingService], (service: BottrainingService) => {
    expect(service).toBeTruthy();
  }));

  //-----------------------------Positive Test Case For addintent------------------------------------
  it('should check addIntent() positive case', fakeAsync(() => {

    let mockResponse=testConfig.res
    mockBackend.connections.subscribe((connection:MockConnection)=>{
      expect(connection.request.method).toBe(RequestMethod.Post);
      tick();
      connection.mockRespond(new Response(new ResponseOptions({
        body:mockResponse
      })));
    });

    let data=testConfig.data
    
    intentService.addIntent(data).subscribe((res)=>{
      expect(res).toBeDefined();
      console.log("mg",res)
      expect(res.status).toEqual(data.status);
    });
  }));


  //----------positive test case for suggest() method-------------------------------------------

  it('should check suggest() positive case', fakeAsync(() => {
    let mockResponse = testConfig.mockResponse
    mockBackend.connections.subscribe((connection:MockConnection)=>{
      expect(connection.request.method).toBe(RequestMethod.Put);
      tick();
      connection.mockRespond(new Response(new ResponseOptions({
        body:mockResponse
      })));
    });

    let dataStub=testConfig.datastub
    
    intentService.suggest(dataStub).subscribe((res)=>{
      expect(res).toBeDefined();

      console.log("Preeti'sresponse",res)
      expect(res[0]).toEqual(dataStub.data[0]);
    });
  }));


  //-----------------------------neagtive test case for suggest() method------------------------

  it('should check suggest() negative case', fakeAsync(() => {
    let mockResponse = testConfig.mockResponse
    mockBackend.connections.subscribe((connection:MockConnection)=>{
      expect(connection.request.method).toBe(RequestMethod.Put);
      tick();
      connection.mockRespond(new Response(new ResponseOptions({
        body:mockResponse
      })));
    });

    let dataStub=testConfig.stub
    
    intentService.suggest(dataStub).subscribe((res)=>{
      expect(res).toBeDefined();

      console.log("Preeti'sresponse",res)
      expect(res[0]).not.toEqual(dataStub.data[0]);
    });
  }));

  //------------------Positive Test Case For addmoreSynonym------------------------------------
  it('should check addmoreSynonym() positive case', fakeAsync(() => {

    let mockResponse=testConfig.addmore
    mockBackend.connections.subscribe((connection:MockConnection)=>{
      expect(connection.request.method).toBe(RequestMethod.Post);
      tick();
      connection.mockRespond(new Response(new ResponseOptions({
        body:mockResponse
      })));
    });

    let data=testConfig.addata
    
    intentService.addMoreSynonym(data.synonymname,data.intentName).subscribe((res)=>{
      expect(res).toBeDefined();
      console.log("kaur",res)
      expect(res._fields[0].properties.name).toEqual(data.synonymname);
    });
  }));

  //----------------------------- Negative Test Case For addmoreSynonym-----------------
  it('should check addmoreSynonym() negative case', fakeAsync(() => {

    let mockResponse=testConfig.addmore
    mockBackend.connections.subscribe((connection:MockConnection)=>{
      expect(connection.request.method).not.toBe(RequestMethod.Get);
      tick();
      connection.mockRespond(new Response(new ResponseOptions({
        body:mockResponse
      })));
    });

    let data=testConfig.addata
    
    intentService.addMoreSynonym(data.synonymname,data.intentName).subscribe((res)=>{
      expect(res).toBeDefined();
      console.log("akaur",res)
      expect(res._fields[0].properties.name).not.toEqual('i');
    });
  }));

  //-----------------------Positive Test Case For deleteintent------------------------------------

  it('should check deleteIntent() positive case', fakeAsync(() => {

    let mockResponse=testConfig.delete

    mockBackend.connections.subscribe((connection:MockConnection)=>{
      expect(connection.request.method).toBe(RequestMethod.Put);
      tick();
      connection.mockRespond(new Response(new ResponseOptions({
        body:mockResponse
      })));
    });

    let data=testConfig.deldata
    
    intentService.deleteIntent(data).subscribe((res)=>{
      expect(res).toBeDefined();
      console.log("mg",res)
      expect(res.data.summary.updateStatistics._stats.nodesDeleted).toEqual(1);
    });
  }));

  //----------------------------- Negative Test Case For deleteintent------------------------------------
  it('should check deleteIntent() negative case', fakeAsync(() => {

    let mockResponse=testConfig.delete

    mockBackend.connections.subscribe((connection:MockConnection)=>{
      expect(connection.request.method).toBe(RequestMethod.Put);
      tick();
      connection.mockRespond(new Response(new ResponseOptions({
        body:mockResponse
      })));
    });

    let data=testConfig.deldata
    
    intentService.deleteIntent(data).subscribe((res)=>{
      expect(res).toBeDefined();
      console.log("mg",res)
      expect(res.data.summary.updateStatistics._stats.nodesDeleted).not.toEqual(2);
    });
  }))

  /*----------------------- positive test case for addSynonym method --------------------------*/
  it('should check addSynonym() positive case', fakeAsync(() => {

    let mockResponse=testConfig.addsyno
    mockBackend.connections.subscribe((connection:MockConnection)=>{
      expect(connection.request.method).toBe(RequestMethod.Put);
      tick();
      connection.mockRespond(new Response(new ResponseOptions({
        body:mockResponse
      })));
    });

    let data=testConfig.addsyno

    intentService.addSynonym(data).subscribe((res)=>{
      expect(res).toBeDefined();
      tick();
      console.log("mohi1",res)
      expect(res.label).toEqual(data.label);
      tick();
      expect(res.syn[0]).toEqual(data.syn[0]);
      tick();
    });
  }));

  /*----------------------------- negative test case for addSynonym method -----------------------*/
  it('should check addSynonym() negative case', fakeAsync(() => {

    let mockResponse=testConfig.negmock
    mockBackend.connections.subscribe((connection:MockConnection)=>{
      expect(connection.request.method).toBe(RequestMethod.Put);
      tick();
      connection.mockRespond(new Response(new ResponseOptions({
        body:mockResponse
      })));
    });

    let data=testConfig.negdata
    intentService.addSynonym(data).subscribe((res)=>{
      expect(res).toBeDefined();
      tick();
      console.log("mohi1",res)
      expect(res.labelname).not.toBe(data.labelname);
      tick();
      expect(res.syn[0]).not.toEqual(data.syn[0]);
      tick();
    });
  }));

  /*--------------------- positive test case for deleteSynonym method ------------------------*/
  it('should check deleteSynonym() positive case', fakeAsync(() => {

    let mockResponse=testConfig.delsyno
    mockBackend.connections.subscribe((connection:MockConnection)=>{
      expect(connection.request.method).toBe(RequestMethod.Put);
      tick();
      connection.mockRespond(new Response(new ResponseOptions({
        body:mockResponse
      })));
    });

    let data=testConfig.del

    intentService.deleteSynonym(data.synonymname,data.intentname).subscribe((res)=>{
      expect(res).toBeDefined();
      tick();
      console.log("mohi2",res)
      expect(res.status).toBe("ok");
      tick();
    });
  }));


  /*---------------------------- negative test case for deleteSynonym method -----------------------*/
  it('should check deleteSynonym() negative case', fakeAsync(() => {

    let mockResponse=testConfig.delsyno
    mockBackend.connections.subscribe((connection:MockConnection)=>{
      expect(connection.request.method).toBe(RequestMethod.Put);
      tick();
      connection.mockRespond(new Response(new ResponseOptions({
        body:mockResponse
      })));
    });

    let data= testConfig.del


    intentService .deleteSynonym(data.synonymname,data.intentname).subscribe((res)=>{
      expect(res).toBeDefined();
      tick();
      console.log("mohi3",res)
      expect(res.status).not.toBe("okk");
      tick();
    });
  }));

});