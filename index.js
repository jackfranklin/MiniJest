var matchers = require('./lib/matchers');
var reporter = require('./lib/reporter');

var MiniJest = {};

MiniJest.Base = function() {
  this.fn = {};
  this.reporter = reporter;
};

MiniJest.Base.prototype = {
  run: function() {
    if(this.fn.beforeAll) this.fn.beforeAll.call(this);
    for(var testName in this.fn) {
      if(testName === 'beforeEach' ||
         testName === 'afterEach' ||
         testName === 'beforeAll' ||
         testName === 'afterAll' ) continue;
      try {
        if(this.fn.beforeEach) this.fn.beforeEach.call(this);
        this.fn[testName].call(this);
        this.reporter.onSuccess(testName);
      } catch(e) {
        this.reporter.onError(e);
      } finally {
        if(this.fn.afterEach) this.fn.afterEach.call(this);
      }
    }
    if(this.fn.afterAll) this.fn.afterAll.call(this);
  },
};

for(var matcher in matchers) {
  MiniJest.Base.prototype[matcher] = matchers[matcher];
}

module.exports = MiniJest;
