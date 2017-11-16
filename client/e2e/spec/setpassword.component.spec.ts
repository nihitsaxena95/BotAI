//import {testConfig} from './util.config';
import { RouterTestingModule } from '@angular/router/testing';
import { browser,element,by } from 'protractor';
import { SetpasswordComponent } from '../../src/app/setpassword/setpassword.component';
import {testConfig} from './util.config';
describe('SetpasswordComponent', () => {
	/*============================Negative Testing for Login==================================*/
  it('setpassword pass error test',()=>{
     browser.get(testConfig.setpass);
    element(by.name('confirmpassword')).sendKeys(testConfig.pass);
    expect(element(by.name('confirmpassword')).getText()).not.toBeNull();
})
/*============================Positive Testing for Login==================================*/
it('setpassword pass ',()=>{
    browser.get(testConfig.setpass)
     element(by.name('confirmpassword')).sendKeys(testConfig.pass);
  	 element(by.id('setpass')).click();
     (expect(element(by.id('setpass')).getText())).toBeDefined(testConfig.set);

  })

});