var MiniJest = require('./index.js');

var testMyThing = new MiniJest.Base();

testMyThing.fn.testTwoPlusTwoEqualsFour = function() {
  this.assertEqual(2 + 3, 4);
};

testMyThing.fn.testAnotherThing = function() {
  this.assert(false);
};

testMyThing.fn.testSomethingElse = function() {
  this.assertThrows(function() {
    throw new Error("threw a thing");
  });
};

testMyThing.matchers.someAssert = function() {
  throw new Error('test fail');
};

testMyThing.fn.testCustomMatcher = function() {
  this.someAssert();
};

testMyThing.fn.asyncTest = function(done) {
  setTimeout(function() {
    var res = 5;
    // done(function() {
    //   this.assertEqual(res, 5);
    // });
  }, 500);
};

testMyThing.run();

