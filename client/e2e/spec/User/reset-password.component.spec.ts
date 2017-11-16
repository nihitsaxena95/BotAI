import { RouterTestingModule } from '@angular/router/testing';
import { browser,element,by } from 'protractor';
import { ResetPasswordComponent } from '../../../src/app/User/reset-password/reset-password.component';
import {testConfig} from './user.config';
describe('ResetPasswordComponent', () => {
//============== Positive resetpassword============================================ 
  it('user resetpassword pass',()=>{
    browser.get(testConfig.reset);
     element(by.id('oldpass')).sendKeys(testConfig.old);
      element(by.name('password')).sendKeys(testConfig.new);
      element(by.id('confpass')).sendKeys(testConfig.new);
     expect(element(by.name('sub')).getText()).toMatch(testConfig.submit);
})
  //============== Positive resetpassword============================================ 
  it('negative resetpassword pass',()=>{
    browser.get(testConfig.reset);
     element(by.id('oldpass')).sendKeys(testConfig.old);
      element(by.name('password')).sendKeys(testConfig.new);
      element(by.id('confpass')).sendKeys(testConfig.new);
      expect(element(by.name('sub')).getText()).not.toBeNull();
     
})
});
