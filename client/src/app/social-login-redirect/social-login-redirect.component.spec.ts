import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { SocialLoginRedirectComponent } from './social-login-redirect.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { RouteStub } from './route-stub';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { testConfig } from './social-login-redirect.config';

// test suite for social login redirect component
describe('SocialLoginRedirectComponent', () => {
  let router = {
    navigateByUrl: jasmine.createSpy(testConfig.navigateUrl)
  }
  let component: SocialLoginRedirectComponent;
  let fixture: ComponentFixture<SocialLoginRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({  // setting environment for testing here 
      imports: [
      FormsModule, BrowserAnimationsModule, HttpModule
      ],
      declarations: [ SocialLoginRedirectComponent ],
      providers : [
      {provide : Router , useValue : router}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(SocialLoginRedirectComponent);
    component = fixture.componentInstance;
    component.cookieValue = testConfig.cookieStubData;

  }));


/*--------------Testing Navigation urls------------*/
  it('Navigate to /user',inject([Router],(router:Router) => {  // inject router here
     fixture.whenStable().then(() => {
      expect(router.navigateByUrl).not.toHaveBeenCalledWith(testConfig.url);
     })
  }));
});

