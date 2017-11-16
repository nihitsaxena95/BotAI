import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
import { ContextComponent } from './context.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ContextService } from './context.service';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import swal from 'sweetalert2';
import { testConfig } from './context.config';

// test suite for context component
describe('ContextComponent', () => {
  let component: ContextComponent;
  let fixture: ComponentFixture<ContextComponent>;
  let service : any;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
      ModalModule.forRoot(),TabsModule.forRoot(),
      FormsModule, HttpModule, RouterTestingModule
      ],
      declarations: [ ContextComponent],
      providers : [
      { provide : ContextService },
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
    fixture = TestBed.createComponent(ContextComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(ContextService);
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //=============positive testcase onItemSelectContext ============================
  // it( "positive onItemSelectContext testcase", () => {
    //   let mockResponse=testConfig.mockResponse;
    //   component.onItemSelectContext(mockResponse);
    //   fixture.whenStable().then(() => {
      //     expect(component.contextval).toEqual(mockResponse);
      //     expect(component.contextval.id).toEqual(mockResponse.id);
      //     expect(component.contextval.label).toEqual(mockResponse.label);
      //     expect(component.contextval.itemName).toEqual(mockResponse.itemName);
      //   })
      // });
      
      //=============negative testcase onItemSelectContext ============================
      // it( "negative onItemSelectContext testcase", () => {
        //   let mockResponse=testConfig.mockResponse;
        //   component.onItemSelectContext(mockResponse);
        //   fixture.whenStable().then(() => {
          //     expect(component.contextval).not.toEqual(null);
          //     expect(component.contextval.id).not.toEqual(undefined);
          //     expect(component.contextval.label).not.toEqual(undefined);
          //     expect(component.contextval.itemName).not.toEqual(undefined);
          //   })
          // });

          // //=============positivetestcase onItemSelect ===================================
          it( "positive onItemSelect testcase", () => {
            let mockResponse1=testConfig.mockResponse1;
            component.onItemSelect(mockResponse1);
            fixture.whenStable().then(() => {
              expect(component.selectedIntent[0]).toEqual(mockResponse1);
              expect(component.selectedIntent[0].id).toEqual(mockResponse1.id);
              expect(component.selectedIntent[0].itemName).toEqual(mockResponse1.itemName);
              expect(component.selectedIntent[0].name).toEqual(mockResponse1.name);
            })
          });

          //=============negative testcase onItemSelect ===================================
          it( "negative onItemSelect testcase", () => {
            let mockResponse1=testConfig.mockResponse1;
            component.onItemSelect(mockResponse1);
            fixture.whenStable().then(() => {
              expect(component.selectedIntent[0]).not.toEqual(null);
              expect(component.selectedIntent[0].id).not.toEqual(null);
              expect(component.selectedIntent[0].itemName).not.toEqual(null);
              expect(component.selectedIntent[0].name).not.toEqual(null);
            })
          });

          //------------positive test case for addInput()----------------
          it('addInput() positive test case', () => {
            expect(component.inputs).toEqual(testConfig.data);
          });

          //------------negative test case for addInput()----------------
          it('addInput() negative test case', () => {
            expect(component.inputs).not.toEqual(null);
          });

          //------------positive test case for addBlog()----------------
          it('addBlog() positive test case', () => {
            expect(component.blog).toEqual(testConfig.data);
          });

          //------------negative test case for addBlog()----------------
          it('addBlog() nagative test case', () => {
            expect(component.blog).not.toEqual(null);
          });
          
          //------------positive test case for removeVideo()----------------
          // it('removeVideo() positive test case', () => {
            //   expect(component.addvideolink).toEqual(testConfig.dataremove);
            // });
            //------------negative test case for removeVideo()----------------
            // it('removeVideo() negative test case', () => {
              //   expect(component.addvideolink).not.toEqual(null);
              // });
              //------------positive test case for removeBlog()----------------
              // it('removeBlog() positive test case', () => {
                //   expect(component.addbloglink).toEqual(testConfig.dataremove);
                // });
                //------------negative test case for removeBlog()----------------
                // it('removeBlog() negative test case', () => {
                  //   expect(component.addbloglink).not.toEqual(null);
                  // });
                });