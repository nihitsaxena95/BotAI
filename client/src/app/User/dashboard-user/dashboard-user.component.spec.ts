// import { async, ComponentFixture, TestBed,fakeAsync,inject } from '@angular/core/testing';
// import { DashboardUserComponent } from './dashboard-user.component';
// import { DashboardUserService } from './dashboard-user.service';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import {Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import { FormsModule } from '@angular/forms';
// import { HttpModule,Http,BaseRequestOptions,XHRBackend } from '@angular/http';
// import {MockBackend, MockConnection } from '@angular/http/testing'
// import { RouterTestingModule } from '@angular/router/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { Router } from '@angular/router';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';

// describe('DashboardUserComponent', () => {
//   let router = {
//     navigate: jasmine.createSpy('navigate')
//   }
//   let component: DashboardUserComponent;
//   let fixture: ComponentFixture<DashboardUserComponent>;
//   let stubdata:any;
//   let de: DebugElement;
//   let el : HTMLElement;
//   let service:DashboardUserService;

//   /*-----------Start of before Each------------*/
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports : [ FormsModule,Ng2SearchPipeModule, HttpModule,RouterTestingModule,BrowserAnimationsModule ],
//       declarations: [ DashboardUserComponent,ProductsComponent ],
//       providers : [ {provide: DashboardUserService},MockBackend,
//       BaseRequestOptions,{provide : Router, useValue : router},
//       {
//         provide: Http,
//         deps: [MockBackend, BaseRequestOptions],
//         useFactory:
//         (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
//           return new Http(backend, defaultOptions);
//         }
//       }]
//     })
//     .compileComponents();
//     fixture = TestBed.createComponent(DashboardUserComponent);
//     component = fixture.componentInstance;
//     service = fixture.debugElement.injector.get(DashboardUserService);
//     fixture.detectChanges();
//   }));
//   /*-------------End of before Each-----------*/

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });


//   /*Start of Positive test for Userdashboard*/
//   it("Userdashboard test successful",inject([Router],(router:Router) => {
//     const id=testConfig.id;
//     fixture.detectChanges();
//     fixture.whenStable().then(() => { 
//       component.detail(id);
//       expect(router.navigate).toHaveBeenCalledWith(['/user/detail/',{'id':id}]);
//     })
//   }))
//   /*End of Positive test for Userdashboard*/


//   /*Start of Negative test for Userdashboard*/
//   it("Userdashboard not test successful",inject([Router],(router:Router) => {
//     const id=testConfig.id;
//     fixture.detectChanges();
//     fixture.whenStable().then(() => { 
//       component.detail(id);
//       expect(router.navigate).not.toHaveBeenCalledWith(['/user/details/',{'id':id}]);
//     })
//   }))
//   /*End of Negative test for Userdashboard*/
// });