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

testMyThing.someAssert = function() {
  throw new Error('test fail');
};

testMyThing.fn.testCustomMatcher = function() {
  this.someAssert();
};

testMyThing.run();

