// import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { RouterTestingModule } from '@angular/router/testing';
// import { SetpasswordService } from './setpassword.service';
// import { FormsModule } from '@angular/forms';
// import { Observable } from 'rxjs/Observable';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import 'rxjs/add/observable/of';
// import { Router } from '@angular/router';
// import { HttpModule } from '@angular/http';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { SetpasswordComponent } from './setpassword.component';
// import { ActivatedRoute } from '@angular/router'; 
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import {RouteStub} from './routerstub';




// export class ActivatedRouteStub
// {
//     private subject = new BehaviorSubject(this.testParams);
//     params = this.subject.asObservable();
//     private _testParams: {};
//     get testParams() { return this._testParams; }
//     set testParams(params: {}) {
//         this._testParams = params;
//         this.subject.next(params);
//     }
// }
// describe('SetpasswordComponent', () => {
//   let comp: SetpasswordComponent;
//   let fixture: ComponentFixture<SetpasswordComponent>;
//   let service: SetpasswordService;
//   let resdata:any;
//   let mockActivate:ActivatedRouteStub;
//   beforeEach(async(() => {
//     mockActivate = new ActivatedRouteStub();
//     TestBed.configureTestingModule({
//       imports: [
//        FormsModule, BrowserAnimationsModule, HttpModule
//       ],
//       declarations: [ SetpasswordComponent ],
//       providers : [
//       {provide : Router, useClass : RouteStub},
//       {provide : SetpasswordService },
//       {provide : ActivatedRoute, useValue : mockActivate}
//       ]
//     })
//     .compileComponents().then(() =>  {
//       fixture = TestBed.createComponent(SetpasswordComponent);
//     comp = fixture.componentInstance;
//     service = fixture.debugElement.injector.get(SetpasswordService);
//     mockActivate.testParams = {username : "nihit",_id : "12344568987654"}
//         fixture.detectChanges();
//     })
//   }));

//   it('should be created undefined password', () => {
//     let obj = {
//       password : undefined,
//       confirmpassword : undefined
//     }
//     comp.setPassword(obj)
//     fixture.detectChanges();
//     expect(comp.error).toBe("Please fill all the Fields");
//   });

//   it('should be created unmatched confirm password', () => {
//     let obj = {
//       password : "jasmien9",
//       confirmpassword : "jasmine9"
//     }
//     comp.setPassword(obj)
//     fixture.detectChanges();
//     expect(comp.error).toBe("Confirm Password does not match");
//   });

//   it('should be created success', () => {
//     let obj = {
//       password : "jasmine9",
//       confirmpassword : "jasmine9"
//     }
//     resdata = {
//       status : false
//     }
//     const spy = spyOn(service, 'setPassword').and.returnValue(
//       Observable.of(resdata)
//       )
//     comp.setPassword(obj)
//     fixture.detectChanges();
//     expect(comp.username).toBe("nihit");
//     expect(comp.ref).toBe(resdata);
//   });

//   it('should be redirect', inject([Router], (router:Router) => {

//    const spy = spyOn(router,'navigateByUrl');
//    comp.redirect();
//    fixture.detectChanges();
//       const navArgs = spy.calls.first().args[0];
//       console.log("pppppp",navArgs);
//       expect(navArgs).toBe('');
//   }));
// });
