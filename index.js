var matchers = require('./lib/matchers');
var reporter = require('./lib/reporter');

var MiniJest = {};

MiniJest.Base = function() {
  this.fn = {};
  this.reporter = reporter;
};

MiniJest.Base.prototype = {
  run: function() {
    if(this.fn.beforeAll) this.fn.beforeAll();
    for(var testName in this.fn) {
      if(testName === 'beforeEach' ||
         testName === 'afterEach' ||
         testName === 'beforeAll' ||
         testName === 'afterAll' ) continue;
      try {
        if(this.fn.beforeEach) this.fn.beforeEach();
        this.fn[testName].call(this.matchers);
        this.reporter.onSuccess(testName);
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
