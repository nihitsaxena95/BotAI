// import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
// import { EditprofileService } from './editprofile.service';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { EditprofileComponent } from './editprofile.component';
// import {Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import { FormsModule } from '@angular/forms';
// import { HttpModule, Http , XHRBackend, ConnectionBackend,Connection, BaseRequestOptions, Response, ResponseOptions,RequestMethod } from '@angular/http';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Router } from '@angular/router';
// import {MockBackend, MockConnection } from '@angular/http/testing'
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { testConfig } from './editprofile.config';


// /*test suite*/
// describe('EditprofileComponent', () => {
//   let router = {
//     navigateByUrl(url:string){
//       return url;
//     }
//   }
//   let component: EditprofileComponent;
//   let fixture: ComponentFixture<EditprofileComponent>;
//   let service: any;

//   /*all the configuartion ,declarations,imports*/
//   beforeEach(async(() => {
    
//     TestBed.configureTestingModule({
//       imports : [
//       FormsModule, HttpModule, RouterTestingModule, BrowserAnimationsModule
//       ],
//       declarations: [ EditprofileComponent ],
//       providers : [
//       { provide : EditprofileService },
      
//       MockBackend,
//       BaseRequestOptions,
//       {
//         provide: Http,
//         deps: [MockBackend, BaseRequestOptions],
//         useFactory:
//         (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
//           return new Http(backend, defaultOptions);
//         }
//       }
//       ],      
//       schemas: [ NO_ERRORS_SCHEMA ]
//     })
//     .compileComponents();

//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(EditprofileComponent);
//     component = fixture.componentInstance;
//     service = fixture.debugElement.injector.get(EditprofileService);
//     fixture.detectChanges();
//   });

//   /*test case if edit profile exists*/
//   it('should be created', () => {
//     expect(component).toBeTruthy();
//   });
//   /* test case for navigateByUrl */
//   it('Testing navigate By Url' ,inject([Router],(router:Router)=> {
//     const spy = spyOn(router , 'navigateByUrl');
//     component.gotoDashboard();
//     expect(router.navigateByUrl).toHaveBeenCalledWith(testConfig.navigateUrl);
//   }));
// });
