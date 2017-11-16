import { async, ComponentFixture, TestBed ,inject, fakeAsync} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute,Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RedirectComponent } from './redirect.component';
import { RedirectService } from './redirect.service';
import {testConfig} from './redirect.config';

export class ActivatedRouteStub
{
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();
  private _testParams: {};
  get testParams() { return this._testParams; }
  set testParams(params: {}) {

    this._testParams = params;
    console.log("hghj",this._testParams)
    this.subject.next(params);
  }
}
class RouterStub {
  navigateByUrl(url: string) { return url; }
}
describe('RedirectComponent', () => {
  let mockParams, mockActivatedRoute;
  let stubdata:any;
  let de: DebugElement;
  let el : HTMLElement;
  let service: RedirectService;
  let comp: RedirectComponent;
  let fixture: ComponentFixture<RedirectComponent>;
  beforeEach(async(() => {
    mockActivatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      imports : [
      FormsModule, HttpModule, BrowserAnimationsModule
      ],
      declarations: [  RedirectComponent ],
      providers : [RedirectService,{provide:Router,  useClass: RouterStub},{provide:ActivatedRoute,useValue: mockActivatedRoute}],
    })
    .compileComponents();
    fixture = TestBed.createComponent(RedirectComponent);
    comp = fixture.componentInstance;
    service = fixture.debugElement.injector.get(RedirectService);
    mockActivatedRoute.testParams=testConfig.id;
  }));


  /*-------testing navigate links --------*/ 
  it('Redirect verified', inject([Router],(router:Router) => {
    stubdata =testConfig.stubData;
      const spy = spyOn(service, 'redirectUrl').and.returnValue(
        Observable.of(stubdata)
        )
      const spy1= spyOn(router,'navigateByUrl');      
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        comp.redirectUrl();
        const args1=spy1.calls.first().args[0];
        expect(args1).toBe('');
      })
      
    }));
});

