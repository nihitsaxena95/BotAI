import { async, ComponentFixture, TestBed ,inject} from '@angular/core/testing';
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
import { ChatComponent } from './chat.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChatService } from './chat.service';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import swal from 'sweetalert2';
import { testConfig } from './chat.config';
class RouterStub {
  navigateByUrl(url: string) { return url; }
}
describe('Chat  Component', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
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
      declarations: [ ChatComponent],
      providers : [
      { provide : ChatService },
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
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(ChatService);
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  })
  //================positive testcase for getquestion===============//


  // it(" Positive Test for getquestion in chat", () => {
  //   let mockResponse = testConfig.getContext.positive;
  //   const spy = spyOn(service,'getquestions').and.returnValue(
  //     Observable.of(mockResponse)
  //     )
  //   component.getquestion(false);
  //   fixture.whenStable().then( ()=> {
  //     expect(component.rep).toEqual(mockResponse);
  //   })   
  // });

  //================negative testcase for getquestion===============//
  it(" negative Test for getContext in chat", () => {
    let mockResponse = testConfig.getContext.negative;
    const spy = spyOn(service,'getquestions').and.returnValue(
      Observable.of(mockResponse)
      )

    component.getquestion(true);

    fixture.whenStable().then( ()=> {
      expect(component.res).toEqual(undefined);
    })   
  });
  //================Start of positive testcase for unansweredquestion===============//
  it(" Positive Test for unansweredquestion in chat", () => {
    let mockResponse = testConfig.unansweredquestion.positive.mockResponse;
    component.answer=testConfig.unansweredquestion.positive.answer;
    const spy = spyOn(service,'unansweredquestion').and.returnValue(
      Observable.of(mockResponse)
      )
    component.unansweredquestion();
    fixture.whenStable().then( ()=> {
      expect(component.rep.ok).toEqual(1);
    })   
  });
  //================Start of positive testcase for unansweredquestion===============//
  //================Start of negative testcase for unansweredquestion===============//
  it(" Negative Test for unansweredquestion in chat", () => {
    let mockResponse = testConfig.unansweredquestion.negative.mockResponse;
    component.answer=testConfig.unansweredquestion.negative.answer;
    const spy = spyOn(service,'unansweredquestion').and.returnValue(
      Observable.of(mockResponse)
      )
    component.unansweredquestion();
    fixture.whenStable().then( ()=> {
      expect(component.rep.ok).not.toEqual(0);
    })   
  });
  //================Start of Negative testcase for unansweredquestion===============//
});