import { RouterTestingModule } from '@angular/router/testing';
import { browser,element,by } from 'protractor';
import { LoginComponent } from '../../src/app/login/login.component';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import {testConfig} from './util.config';

  describe('RegisterComponent', () => {

    /*============================Positive Testing for Login==================================*/

    it('Register should pass' , () =>{
      browser.get(testConfig.register);
      element(by.name('name')).sendKeys(testConfig.name);
      element(by.name('email')).sendKeys(testConfig.email);
      expect(element(by.name('password')).sendKeys(testConfig.password))
     .toEqual(element(by.name('confirmPassword')).sendKeys(testConfig.password));
      //expect(element(by.id('login-button')).getText()).toEqual(testConfig.login);
      element(by.id('login-button')).click();  
    })

      /*============================Negative Testing for Login==================================*/
  it('register pass error test',()=>{
     browser.get(testConfig.register);
     element(by.name('name')).sendKeys(testConfig.name);
      element(by.name('email')).sendKeys(testConfig.email);
      expect(element(by.name('password')).sendKeys(testConfig.password))
     .toEqual(element(by.name('confirmPassword')).sendKeys(testConfig.password));
    expect(element(by.name('password')).getText()).not.toBeNull();
})
    

  });

