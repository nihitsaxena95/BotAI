import { RouterTestingModule } from '@angular/router/testing';
import { browser,element,by } from 'protractor';
import { AddtaskComponent } from '../../../src/app/admin/addtask/addtask.component';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import {testConfig} from './adminutil.config';

  describe('AddtaskComponent', () => {

    /*============================Positive Testing for Login==================================*/

    it('AddtaskComponent pass' , () =>{
      browser.get(testConfig.addtask);
      element(by.name('answer')).sendKeys(testConfig.ans);
      element(by.name('nextans')).sendKeys(testConfig.ans1);
      element(by.name('res')).sendKeys(testConfig.ans2);
      element(by.name('negative')).sendKeys(testConfig.ans3);
      element(by.name('nextneg')).sendKeys(testConfig.ans4);
      element(by.name('negres')).sendKeys(testConfig.ans5);
     
     
      element(by.id('sub')).click();
    })
    /*======================Error Testing for AddtaskComponent=============================*/
     it('AddtaskComponent error testing',()=>{
       browser.get(testConfig.addtask);
         expect(element(by.id('sub')).getText()).not.toBeNull();
       })


  });

