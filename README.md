# MiniJest

Because the world needs more testing frameworks.

This is my attempt at a testing framework, for fun more than anything else. Loosely inspired by Ruby MiniTest and its way of writing tests that are just methods on a class.

## Example

```js
var MiniJest = require('./index.js');

var testMyThing = new MiniJest.Base();

// all tests are added to the fn object
testMyThing.fn.testTwoPlusTwoEqualsFour = function() {
  this.assertEqual(2 + 3, 4);
};

// nothing happens without this line!
testMyThing.run();
```

## Customising the Reporter
You can change the reporter like so:

```js
var MiniJest = require('./index.js');

var testMyThing = new MiniJest.Base();

testMyThing.reporter.onSuccess = function(testName) {
    // called when test passes
};

testMyThing.reporter.onError = function(err) {
    // called when test fails
};

testMyThing.run();
```

## Adding Matchers

```js
var MiniJest = require('./index.js');

var testMyThing = new MiniJest.Base();

// a new matcher that always fails
// matchers added to the matchers object
// a failed matcher is expected to throw an error
testMyThing.matchers.alwaysFailsAssertion = function() {
    throw new Error('test failed');
};

testMyThing.fn.testCustomMatcher = function() {
    this.alwaysFailsAssertion();
};

testMyThing.run();
```

## Handling Async

MiniJest handles async a little differently. An async test takes a callback, but you pass that callback a function in which you make your assertions:

```js
testMyThing.fn.asyncTest = function(done) {
  setTimeout(function() {
    var res = 5;
    done(function() {
      this.assertEqual(res, 5);
    });
  }, 500);
};
```

This seems a little odd but is actually quite a nice way of doing things in practice.

