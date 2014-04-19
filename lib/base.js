var matchers = require('./matchers');
var reporter = require('./reporter');

var MiniJestBase = function() {
  this.fn = {};
  this.reporter = reporter;
  this.wasFail = false;
  this.waitingOnAsync = false;
};


MiniJestBase.prototype = {
  runFunction: function(testName) {
    var fnStr = this.fn[testName].toString();
    // this test needs to be so much better
    var doneRegex = /\(\s?done\s?\)/ig;
    if(doneRegex.test(fnStr)) {
      this.waitingOnAsync = true;
      this.asyncTestName = testName;
      var doneCallback = function(asserts) {
        try {
          asserts.call(this.matchers);
          this.reporter.onSuccess(testName);
        } catch(e) {
          this.wasFail = true;
          this.reporter.onError(e);
        } finally {
          this.waitingOnAsync = false;
        }
      }.bind(this);
      this.fn[testName].call(this.matchers, doneCallback);
    } else {
      this.fn[testName].call(this.matchers);
      this.reporter.onSuccess(testName);
    }
  },
  run: function(opts) {
    opts = opts || {};
    var noExit = opts.noExit === true ? true : false;
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
        this.wasFail = true;
        this.reporter.onError(e);
      } finally {
        if(this.fn.afterEach) this.fn.afterEach();
      }
    }
    if(this.fn.afterAll) this.fn.afterAll();
    if(this.waitingOnAsync) {
      setTimeout(function() {
        if(this.waitingOnAsync) {
          this.reporter.onAsyncTimeout(this.asyncTestName);
          if(!noExit) process.exit(1);
        } else {
          if(!noExit) process.exit(this.wasFail ? 1 : 0);
        }
      }.bind(this), 1000);
    } else {
      if(!noExit) process.exit(this.wasFail ? 1 : 0);
    }
  },
};

MiniJestBase.prototype.matchers = matchers;

module.exports = MiniJestBase;
