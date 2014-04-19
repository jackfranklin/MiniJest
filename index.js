var matchers = require('./lib/matchers');
var reporter = require('./lib/reporter');

var MiniJest = {};

MiniJest.Base = function() {
  this.fn = {};
  this.reporter = reporter;
};

MiniJest.Base.prototype = {
  runFunction: function(testName) {
    var fnStr = this.fn[testName].toString();
    // this test needs to be so much better
    if(fnStr.indexOf('(done)') > - 1) {
      this.fn[testName].call(this.matchers, function(asserts) {
        try {
          asserts.call(this.matchers);
          this.reporter.onSuccess(testName);
        } catch(e) {
          this.reporter.onError(e);
        }
      }.bind(this));
    } else {
      this.fn[testName].call(this.matchers);
      this.reporter.onSuccess(testName);
    }
  },
  run: function() {
    if(this.fn.beforeAll) this.fn.beforeAll();
    for(var testName in this.fn) {
      if(testName === 'beforeEach' ||
         testName === 'afterEach' ||
         testName === 'beforeAll' ||
         testName === 'afterAll' ) continue;
      try {
        if(this.fn.beforeEach) this.fn.beforeEach();
        this.runFunction(testName);
      } catch(e) {
        this.reporter.onError(e);
      } finally {
        if(this.fn.afterEach) this.fn.afterEach();
      }
    }
    if(this.fn.afterAll) this.fn.afterAll();
  },
};

MiniJest.Base.prototype.matchers = matchers;

module.exports = MiniJest;
