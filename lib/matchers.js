var deepEqual = require('deep-equal');
var matchers = {
  assertEqual: function(x, y) {
    if(x != y) {
      throw new Error('assertEqual: ' + x + ' == ' + y);
    }
  },
  assert: function(x) {
    if(!x) {
      throw new Error('assert: ' + x + ' == true');
    }
  },
  assertThrows: function(fn) {
    try {
      fn();
      throw new Error('assertThrows: did not throw');
    } catch(e) {
      if(e.message.indexOf('assertThrows') > -1) {
        throw(e);
      }
    }
  },
  assertDeepEqual: function(x, y) {
    if(!deepEqual(x, y)) {
      throw new Error('assertDeepEqual: ' + x + ' and ' + y + ' not deepEqual');
    }
  }
};

module.exports = matchers;
