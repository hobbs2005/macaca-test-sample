/* ================================================================
 * macaca-test-sample by xdf(xudafeng[at]126.com)
 *
 * first created at : Thu Mar 10 2016 14:21:49 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright  xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

var path = require('path');

var platform = process.env.platform || 'iOS';

var wd = require('webdriver-client')({
  platformName: platform,
  app: path.join(__dirname, '..', 'app', `${platform.toLowerCase()}-app-bootstrap.zip`)
});

describe('macaca test sample', function() {
  this.timeout(5 * 60 * 1000);

  var driver = wd.initPromiseChain();

  before(function() {
    return driver.initDriver();
  });

  after(function() {
    return driver
      .sleep(1000)
      .quit();
  });

  it('#1 should login success', function() {
    return driver
      .login('12345678', '111111')
      .sleep(1000);
  });

  it('#2 should display home', function() {
    return driver
      .takeScreenshot();
  });

  it('#3 should display webview', function() {
    return driver
      .elementByName('Webview')
      .click()
      .sleep(3000)
      .takeScreenshot();
  });

  it('#4 should go into webview', function() {
    return driver
      .webview()
      .elementById('pushView')
      .tap()
      .sleep(5000)
      .webview()
      .elementById('popView')
      .tap()
      .sleep(5000)
      .takeScreenshot();
  });

  it('#5 should go into test', function() {
    return driver
      .native()
      .elementByName('Baidu')
      .click()
      .sleep(5000)
      .takeScreenshot();
  });

  it('#6 should works with web', function() {
    return driver
      .webview()
      .elementById('index-kw')
      .sendKeys('TesterHome')
      .elementById('index-bn')
      .tap()
      .sleep(5000)
      .source()
      .then(function(html) {
        html.should.containEql('TesterHome');
      })
      .takeScreenshot();
  });

  it('#7 should logout success', function() {
    return driver
      .contexts()
      .then(function(arr) {
        return driver
          .context(arr[0]);
      })
      .elementByName('PERSONAL')
      .click()
      .sleep(1000)
      .takeScreenshot()
      .elementByName('Logout')
      .click()
      .sleep(1000)
      .takeScreenshot();
  });
});
