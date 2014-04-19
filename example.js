var MiniJest = require('./index.js');

var testMyThing = new MiniJest.Base();

testMyThing.fn.beforeEach = function() {
};

testMyThing.fn.afterEach = function() {
};

testMyThing.fn.beforeAll = function() {
};

testMyThing.fn.afterAll = function() {
};

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

testMyThing.run();

