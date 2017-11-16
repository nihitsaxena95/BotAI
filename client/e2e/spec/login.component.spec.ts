import { RouterTestingModule } from '@angular/router/testing';
import { browser,element,by } from 'protractor';
import { LoginComponent } from '../../src/app/login/login.component';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import {testConfig} from './util.config';

  describe('LoginComponent', () => {

    /*============================Positive Testing for Login==================================*/

    it('Login should pass' , () =>{
      browser.get(testConfig.login);
      element(by.name('email')).sendKeys(testConfig.email);
      element(by.name('password')).sendKeys(testConfig.password);
      element(by.id('loginbtn')).click();
    })

  /*============================Negative Testing for Login==================================*/
  it('login pass error test',function(){
     browser.get(testConfig.login);
       element(by.name('email')).sendKeys(testConfig.email);
      element(by.name('password')).sendKeys(testConfig.password);
    expect(element(by.name('password')).getText()).not.toBeNull();
})

  });

