import { RouterTestingModule } from '@angular/router/testing';
import { browser,element,by } from 'protractor';
import { DashboardComponent } from '../../../src/app/admin/dashboard/dashboard.component';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import {testConfig} from './adminutil.config';
  describe('Dashboarduser Component', () => {

    /*============================Positive Testing for Login==================================*/

    it('Dashboarduser Component should pass' , () =>{
      browser.get(testConfig.dashboard);
      element(by.css('.card-body')).click();
    })


    /*============================Negative Testing for Login==================================*/

    it('Negative Dashboarduser Component should pass' , () =>{
      browser.get(testConfig.dashboard);
      expect(element(by.css('.card-body')).getText()).not.toBeNull();
    })

  });
