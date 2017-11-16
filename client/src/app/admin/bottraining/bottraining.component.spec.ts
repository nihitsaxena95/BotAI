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
import { BottrainingComponent } from './bottraining.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BottrainingService } from './bottraining.service';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import swal from 'sweetalert2';
import {testConfig} from './bottraining.config';

//------------RouterStub-------------
class RouterStub {
  navigateByUrl(url: string) { return url; }
}

//------------test suite for bot training component-------------
describe('Bot training Component', () => {
  let component: BottrainingComponent;
  let fixture: ComponentFixture<BottrainingComponent>;
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
      declarations: [ BottrainingComponent],
      providers : [
      { provide : BottrainingService },
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
    fixture = TestBed.createComponent(BottrainingComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(BottrainingService);
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //================test for getunanswer===================///
  it( "getunanswer", async(() => {
    spyOn(service, 'getunanswer').and.returnValue(Observable.of(testConfig.getunanswerData));
    component.getunanswer();
    fixture.whenStable().then(() => {
      expect(component.ref).toEqual(testConfig.getunanswerData[0].questions);
    })
  }))
  //================ positive test for deletependingquestion==============//
  it("Positive test for deletePendingQuestions in bot training", () => {
    const spy = spyOn(service,'deletePendingQuestions').and.returnValue(
      Observable.of(testConfig.datadeletependingques)
      )
    component.deletePendingQuestions(testConfig.quesdeletependingques);
    fixture.whenStable().then( ()=> {
      expect(component.rep.ok).toEqual(1);
    })   
  });
  //===============negative test for deletependingquestion===========//
  it("Negative test for deletePendingQuestions in bot training", () => {
    const spy = spyOn(service,'deletePendingQuestions').and.returnValue(
      Observable.of(testConfig.datadeletependingques)
      )
    component.deletePendingQuestions(testConfig.quesdeletependingques);
    fixture.whenStable().then( ()=> {
      expect(component.rep.nModified).not.toEqual(0);
    })   
  });
  /*Start of positive test for deleteIntent in bot training*/
  it("Positive test for deleteIntent in bot training", () => {
    const spy = spyOn(service,'deletePendingQuestions').and.returnValue(
      Observable.of(testConfig.deleteIntentResponse)
      )
    component.deletePendingQuestions(testConfig.deleteIntentData);
    fixture.whenStable().then( ()=> {
      expect(component.rep.summary.statement.text).toEqual(testConfig.deleteIntentResponse.summary.statement.text);
    })   
  });
  /*End of positive test for deleteIntent in bot training*/
  /*Start of Negative test for deleteIntent in bot training*/
  it("Neagtive test for deleteIntent in bot training", () => {
    const spy = spyOn(service,'deletePendingQuestions').and.returnValue(
      Observable.of(testConfig.deleteIntentResponse)
      )
    component.deletePendingQuestions(testConfig.deleteIntentData);
    fixture.whenStable().then( ()=> {
      expect(component.rep.summary.statement.text).not.toEqual("");
    })   
  });
  /*End of Negative test for deleteIntent in bot training*/
  /*Start of Positive test for suggest in bot training*/
  it("Positive test for suggest in bot training", () => {
    component.addintent = testConfig.suggestTol;
    component.temp = testConfig.suggestKind;
    const spy = spyOn(service,'suggest').and.returnValue(
      Observable.of(testConfig.suggestData)
      )
    component.suggest();
    fixture.whenStable().then( ()=> {
      expect(component.synres).toEqual(testConfig.suggestData);
    })   
  });
  /*End of Positive test for suggest in bot training*/
  /*Start of Neagtive test for suggest in bot training*/
  it("Neagtive test for suggest in bot training", () => {
    component.addintent = testConfig.suggestTol;
    component.temp = testConfig.suggestKind;    
    const spy = spyOn(service,'suggest').and.returnValue(
      Observable.of(testConfig.suggestData)
      )
    component.suggest();
    fixture.whenStable().then( ()=> {
      expect(component.synres).not.toEqual(testConfig.suggestKind);
    })   
  });
  /*End of Neagtive test for suggest in bot training*/
  //========sendques positive test case============//
  it("sendques positive case", () => {
    const spy = spyOn(service,'sendques').and.returnValue(
      Observable.of(testConfig.datasendques)
      )
    component.sendques(testConfig.questionsendques);
    fixture.whenStable().then( ()=> {
      expect(component.rep[0].n).not.toEqual(1);
    })   
  });
  //sendques negative test case
  it("sendques negative case", () => {
    const spy = spyOn(service,'sendques').and.returnValue(
      Observable.of(testConfig.datasendques)
      )
    component.sendques(testConfig.questionsendques);
    fixture.whenStable().then( ()=> {
      expect(component.rep[0].n).not.toEqual(0);
    })   
  });
  //=========positive test cases for addIntent==========//
  it("addIntent positive case", () => {
    const question = testConfig.questionaddIntent;
    const item=testConfig.itemaddIntentpos;
    const spy = spyOn(service,'addIntent').and.returnValue(
      Observable.of(item)
      )
    component.addIntent();
    fixture.whenStable().then( ()=> {
      expect(component.rep.data.length).toEqual(1);
    })   
  });
  //==========positive test cases for addIntent===========//
  it("addIntent negative case", () => {
    const question = testConfig.questionaddIntent;
    const item=testConfig.itemaddIntentneg
    const spy = spyOn(service,'addIntent').and.returnValue(
      Observable.of(item)
      )
    component.addIntent();
    fixture.whenStable().then( ()=> {
      expect(component.rep.data.length).not.toEqual(0);
    })   
  });
  //===========positive test case for getIntent==============//
  it("Positive Test case for getIntent" , () => {
    const spy = spyOn(service , 'getIntent').and.returnValue(
      Observable.of(testConfig.mockResponseIntentPositive)
      )
    component.getIntent();
    fixture.whenStable().then(()=>{
      expect(component.intentName[0].label).toEqual(data[0]._fields[0].labels[0]);
    })
  })
  //===========negative test case for getIntent==============//
  it("Negative Test Case For getIntent" , () => {
    const spy = spyOn(service , 'getIntent').and.returnValue(
      Observable.of(testConfig.mockResponseIntentNegative)
      )
    component.getIntent();
    fixture.whenStable().then(()=>{
      expect(component.intentName[0].label).not.toEqual(data[0]._fields[0].labels[0]);
    })
  })
  //===========positive test case for relatedEntity==============//
  it("Positive Test Case For relatedEntity" , ()=>{
    const spy = spyOn(service , 'getRelatedEntity').and.returnValue(
      Observable.of(testConfig.mockResponseRelatedPositive)
      )
    component.relatedentity(testConfig.dataRelatedEntity);
    fixture.whenStable().then(()=> {
      expect(component.correspondSynonym).toEqual(testConfig.mockResponseRelatedPositive);
    })
  })
  //===========negative test case for relatedEntity==============//
  it("Negative Test Case For relatedEntity" , ()=>{
    const spy = spyOn(service , 'getRelatedEntity').and.returnValue(
      Observable.of(testConfig.mockResponseRelatedNegative)
      )
    component.relatedentity(testConfig.dataRelatedEntity);
    fixture.whenStable().then(()=> {
      expect(component.correspondSynonym).toEqual(testConfig.mockResponseRelatedNegative);
    })
  })
  //===========positive test case for addSynonym==============//
  it("Positive Test Case For addSynonym" , inject([Router],(router:Router)=> {
    const spy = spyOn(service , 'addSynonym').and.returnValue(
      Observable.of(testConfig.mockResponseAddSynonym)
      )
    component.value = testConfig.dataAddSynonym.label;
    component.main = testConfig.dataAddSynonym.syn;
    component.addintent = testConfig.dataAddSynonym.labelname;
    fixture.whenStable().then(()=>{
      component.addSynonym();
      expect(router.navigateByUrl).toHaveBeenCalledWith('/admin/trainingbot');
      expect(component.ref).toEqual(testConfig.mockResponseAddSynonym);
    })
  }))
  //===========negative test case for addSynonym==============//
  it("Negative Test Case For addSynonym" , inject([Router],(router:Router)=> {
    const spy = spyOn(service , 'addSynonym').and.returnValue(
      Observable.of(testConfig.mockResponseAddSynonymNegative)
      )
    component.value = testConfig.dataAddSynonym.label;
    component.main = testConfig.dataAddSynonym.syn;
    component.addintent = testConfig.dataAddSynonym.labelname;
    fixture.whenStable().then(()=>{
      component.addSynonym();
      expect(router.navigateByUrl).toHaveBeenCalledWith('/admin/trainingbot');
      expect(component.ref).toEqual(testConfig.mockResponseAddSynonymNegative);
    })
  }))
  //================positive testcase for getcontext()===============//
  it(" Positive Test for getContext in bot training", () => {
    const spy = spyOn(service,'getContext').and.returnValue(
      Observable.of(testConfig.mockResponsegetContextPos)
      )
    component.getContext();
    fixture.whenStable().then( ()=> {
      expect(component.res).toEqual(testConfig.mockResponsegetContextPos);
    })   
  });
  //================negative testcase for getcontext()===============//
  it(" Negative Test for getContext in bot training", () => {
    const spy = spyOn(service,'getContext').and.returnValue(
      Observable.of(testConfig.mockResponsegetContextNeg)
      )
    component.getContext();
    fixture.whenStable().then( ()=> {
      expect(component.res[0]._fields[0].labels).toEqual(testConfig.mockResponsegetContextNeg[0]._fields[0].labels);
    })   
  });
  //================positive testcase for setsynonym()===============//
  it(" Positive Test for setSynonym in bot training", () => {
    const spy = spyOn(service,'setSynonym').and.returnValue(
      Observable.of(testConfig.mockResponsesetSynonymPos)
      )
    component.setSynonym(testConfig.intentsetSynonym);
    fixture.whenStable().then( ()=> {
      expect(component.ref).toEqual(testConfig.mockResponsesetSynonymPos);
    })   
  });
  //================negative testcase for setSynonym===============//
  it(" Negative Test for setSynonym in bot training", () => {
    const spy = spyOn(service,'setSynonym').and.returnValue(
      Observable.of(testConfig.mockResponsesetSynonymNeg)
      )
    component.setSynonym(testConfig.intentsetSynonym);
    fixture.whenStable().then( ()=> {
      expect(component.ref.status).not.toEqual(true);
      expect(component.ref._fields[0].labels).not.toEqual(testConfig.mockResponsesetSynonymNeg.data[0]._fields[0].labels);
    })   
  });
  //================positive testcase for addAdminSynonym===============//
  it(" Positive Test for addAdminSynonym in bot training", () => {
    const spy = spyOn(service,'addMoreSynonym').and.returnValue(
      Observable.of(testConfig.mockResponseAddAdminSynonymPos)
      )
    component.addAdminSynonym();
    fixture.whenStable().then( ()=> {
      expect(component.res._fields[0].properties.name).toEqual(testConfig.mockResponseAddAdminSynonymPos._fields[0].properties.name);
      expect(component.res._fields[0].labels).toEqual(testConfig.mockResponseAddAdminSynonymPos._fields[0].labels);
    })   
  });
  //================negative testcase for addAdminSynonym===============//
  it(" Negative Test for addAdminSynonym in bot training", () => {
    const spy = spyOn(service,'addMoreSynonym').and.returnValue(
      Observable.of(testConfig.mockResponseAddAdminSynonymNeg)
      )
    component.addAdminSynonym();
    fixture.whenStable().then( ()=> {
      expect(component.res._fields[0].labels).not.toEqual(testConfig.mockResponseAddAdminSynonymNeg._fields[0].labels);
    })   
  });

  //========Start of Positive test for deletesynonym in bot training==========//
  it("Positive test for deletesynonym in bot training", () => {
    const data = testConfig.datadeletesynonym;
    const value= testConfig.valuedeletesynonym;
    const spy = spyOn(service,'deleteSynonym').and.returnValue(
      Observable.of(value)
      )
    component.intentname= testConfig.intentnamedeletesynonym;
    component.deletesynonym(data);
    fixture.whenStable().then( ()=> {
      console.log(component.rep);
      expect(component.rep.status).toEqual(true);
    })   
  });

  /*=======End of Positive test for deletesynonym in bot training*==========/
  /*=========Start of Negative test for deletesynonym in bot training========*/
  it("Negative test for deletesynonym in bot training", () => {
    const data = testConfig.datadeletesynonym;
    const value= testConfig.valuedeletesynonym;
    const spy = spyOn(service,'deleteSynonym').and.returnValue(
      Observable.of(value)
      )
    component.intentname=testConfig.intentnamedeletesynonym;
    component.deletesynonym(data);
    fixture.whenStable().then( ()=> {
      console.log(component.rep);
      expect(component.rep.status).not.toEqual(false);
    })   
  });
  /*============End of Negative test for deletesynonym in bot training============*/

  /*=========Positive test for getQues(bottraining========*/
  it("Positive test for getQues in bot training", () => {
    const ques = testConfig.quesgetQues;
    const data=  testConfig.datagetQues;
    const spy = spyOn(service,'getQues').and.returnValue(
      Observable.of(data)
      )
    component.getQues(ques);
    fixture.whenStable().then( ()=> {
      expect(component.rep).toEqual(data);
    })   
  });
  /*=========End Positive test for getQues(bottraining========*/
  /*=========Negative test for getQues(bottraining========*/
  it("Negative test for getQues in bot training", () => {
    const ques = testConfig.quesgetQues;
    const data=testConfig.datagetQues;
    const spy = spyOn(service,'getQues').and.returnValue(
      Observable.of(data)
      )
    component.getQues(ques);
    fixture.whenStable().then( ()=> {
      expect(component.rep).not.toEqual(testConfig.datagetQuesneg);
    })   
  });
  /*=========End Negative test for getQues(bottraining========*/
  
});  