var matchers = require('./lib/matchers');
var reporter = require('./lib/reporter');

var MiniJest = {};

MiniJest.Base = function() {
  this.fn = {};
  this.errors = [];
};

MiniJest.Base.prototype = {
  run: function() {
    for(var testName in this.fn) {
      try {
        this.fn[testName].call(this);
        reporter.onSuccess(testName);
      } catch(e) {
        reporter.onError(e);
      }
    }
  },
};

for(var matcher in matchers) {
  MiniJest.Base.prototype[matcher] = matchers[matcher];
}

module.exports = MiniJest;
