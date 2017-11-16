import { TestBed, inject, async, getTestBed ,tick, fakeAsync } from '@angular/core/testing';
import { Http, HttpModule , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod} from '@angular/http';
import {MockBackend, MockConnection } from '@angular/http/testing';
import { ChatService } from './chat.service';

describe('ChatService', () => {
    let mockBackend:MockBackend;
    let contextService:ChatService;
 beforeEach(() => {
   TestBed.configureTestingModule({
     providers: [ChatService,
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
   contextService =getTestBed().get(ChatService);
   mockBackend = TestBed.get(MockBackend);
 });

  it('should be created', inject([ChatService], (service: ChatService) => {
    expect(service).toBeTruthy();
  }));
});