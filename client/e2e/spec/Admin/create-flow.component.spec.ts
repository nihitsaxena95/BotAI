import { RouterTestingModule } from '@angular/router/testing';
import { browser,element,by } from 'protractor';
import { CreateFlowComponent } from '../../../src/app/admin/create-flow/create-flow.component';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import {testConfig} from './adminutil.config';
  describe('CreateFlow Component', () => {

    /*============================Positive Testing for Login==================================*/

    it('CreateFlow  Component should pass' , () =>{
      browser.get(testConfig.create);
       element(by.id('aflow')).sendKeys(testConfig.flowname);
       element(by.id('flowbtn')).click();
    })

     /*============================Negative Testing for Login==================================*/

    it(' negative CreateFlow  Component should pass' , () =>{
      browser.get(testConfig.create);
       element(by.id('aflow')).sendKeys(testConfig.flowname);
      expect(element(by.id('flowbtn')).getText()).not.toBeNull();
    })


  });
