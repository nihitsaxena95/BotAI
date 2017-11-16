import { RouterTestingModule } from '@angular/router/testing';
import { browser,element,by } from 'protractor';
import { DashboardUserComponent } from '../../../src/app/User/dashboard-user/dashboard-user.component';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import {testConfig} from './user.config';
  describe('Dashboarduser Component', () => {

    /*============================Positive Testing for Dashboard==================================*/

    it('Dashboarduser Component should pass' , () =>{
      browser.get(testConfig.dash);
      element(by.css('.card-body')).click();
    })

  });
