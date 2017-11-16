// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/spec/login.component.spec.ts',
    './e2e/spec/register.component.spec.ts',
    './e2e/spec/forgotpassword.component.spec.ts',
    //'./e2e/spec/setpassword.component.spec.ts',
    './e2e/spec/redirect.component.spec.ts',
    './e2e/spec/User/dashboard-user.component.spec.ts',
    './e2e/spec/User/reset-password.component.spec.ts',
    './e2e/spec/Admin/dashboard.component.spec.ts',
    './e2e/spec/Admin/create-flow.component.spec.ts',
    './e2e/spec/Admin/addtask.component.spec.ts',
    './e2e/spec/Admin/traindomain.component.spec.ts',

  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:49152/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  },
  onPrepare() {
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
