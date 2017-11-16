import { async, ComponentFixture, TestBed,inject} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { TraindomainComponent } from './traindomain.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TraindomainService } from './traindomain.service';
import {Observable} from 'rxjs/Observable';
import { testConfig } from './traindomain.config';

//------------RouterStub-------------
class RouterStub {
  navigateByUrl(url: string) { return url; }
}

// stub data
let trainDomainServiceStub = {
  isLoggedIn: true,
  user: { name: 'Test User'}
};

// test suite for train domain component
describe('Train Domain Component', () => {
  let component: TraindomainComponent;
  let fixture: ComponentFixture<TraindomainComponent>;
  let service : any;
  let data:any;
  let spy:any;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(async(() =>{
    TestBed.configureTestingModule({
      imports : [
      ModalModule.forRoot(), TabsModule.forRoot(),
      FormsModule,
      HttpModule,
      RouterTestingModule
      ],
      declarations: [ TraindomainComponent],
      providers : [ TraindomainService ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(TraindomainComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(TraindomainService);
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  //================ positive test for editdata==============//
  it("Positive test for editdata in train domain", () => {

    let res = {_id: "5a07f9773ee2300f80ed90df",
    task: "Ishan",
    question: 
    {genre: "Question", id: 1, type: "Q", message: "Hello Ishan", answertype: "MCQ"},
    }

  const spy = spyOn(service,'getdata').and.returnValue(
    Observable.of(res)
    )

  component.editdata("Ishan");
  fixture.whenStable().then( ()=> {
    expect(component.productdata).toEqual(res);
  })   
});
  //================ positive test for editdata==============//

   //================ negative test for editdata==============//
  it("Negative test for editdata in train domain", () => {

    let res = testConfig.editDataRes;
  const spy = spyOn(service,'getdata').and.returnValue(
    Observable.of(res)
    )

  component.editdata(testConfig.editDataRes.task);
  fixture.whenStable().then( ()=> {
    expect(component.productdata).not.toEqual(0);
  })   
});
  //================ end negative test for editdata==============//


   //================ positive test for save==============//
    it("Positive test for save in train domain",inject([Router],(router:Router) => {

     let res = { status: false, message: "Data Undefined", data: null }

 const spy = spyOn(service,'save').and.returnValue(
    Observable.of(res)
    )
 const sp1 = spyOn(router, 'navigateByUrl');

  component.save();
  const navArgs = sp1.calls.first().args[0];
  fixture.whenStable().then( ()=> {
    expect(navArgs).toBe('/admin/createflow');
  })   
}));
  //================ End positive test for save==============//


});
